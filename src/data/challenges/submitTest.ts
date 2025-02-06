'use server'
import judge0 from '@/lib/judge0'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { describe, test, expect } from '@/utils/testUtils'

export default async function submitTest(code: string, challengeId: number) {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user?.id) {
    throw new Error('User not authorized')
  }

  const userId = session.user.id

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
    select: { tests: true }
  })

  if (!challenge?.tests) {
    throw new Error('Challenge tests not found')
  }

  const combinedCode = `
  ${describe.toString()}
  ${test.toString()}
  ${expect.toString()}
  ${challenge.tests}
  ${code}
  `
  const judge =  await judge0(combinedCode)

  let resultArray = [];
  try {
    const cleanedResult = judge.stdout.trim()
      .replace(/([,{])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') 
      .replace(/'/g, '"');

      resultArray = JSON.parse(cleanedResult);
  } catch (error) {
    console.error('Failed to parse judge0 result:', error);
  }

  console.log(resultArray)
  await prisma.submission.upsert({
    where: {
      userId_challengeId: { userId, challengeId },
    },
    update: {
      code,
      passed: false,
      createdAt: new Date(),
    },
    create: {
      userId,
      challengeId,
      code,
      passed: false
    },
  })
  console.log(judge)
  return resultArray
}
