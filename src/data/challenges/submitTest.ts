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
    select: { tests: true },
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

  const judge = await judge0(combinedCode)
  let resultArray = []
  let userPassed = true

  const cleanedResult = judge.stdout
    .trim()
    .replace(/([,{])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
    .replace(/'/g, '"')

  resultArray = JSON.parse(cleanedResult)
  console.log('cleaned result: ', cleanedResult)

  try {
    for (let i = 0; i < resultArray.length; i++) {
      console.log('passed: ', resultArray[i].passed)
      if (!resultArray[i].passed) {
        userPassed = false
        break
      }
      await prisma.submission.upsert({
        where: {
          userId_challengeId: { userId, challengeId },
        },
        update: {
          code,
          passed: userPassed,
          createdAt: new Date(),
        },
        create: {
          userId,
          challengeId,
          code,
          passed: userPassed,
        },
      })
    }
  } catch (error) {
    console.error('Failed to parse judge0 result:', error)
  }

  return resultArray
}

export async function giveUserXP(challenge: {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: string | null
  title: string
  description: string
  level: number
  boilerplate: string | null
  tips: string | null
  tests: string
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user || !session.user.id) {
    throw new Error('User not authorized')
  }

  const difficulty = challenge.level
  console.log('challenge difficulty: ', difficulty)

  const existingXP = await prisma.experience.findUnique({
    where: {
      userId_challengeId: {
        userId: challenge.userId!,
        challengeId: challenge.id,
      },
    },
  })

  if (existingXP) {
    console.log('User has already cleared this challenge and been awarded XP.')
    return
  }

  let xpValue = 0
  switch (challenge.level) {
    case 0:
      xpValue = 100
      break
    case 1:
      xpValue = 200
      break
    case 2:
      xpValue = 300
      break
  }

  const xpRecord = await prisma.experience.create({
    data: {
      userId: challenge.userId!,
      challengeId: challenge.id,
      value: xpValue,
    },
  })

  console.log('Awarded XP record:', xpRecord)
  return xpRecord
}

export async function depleteUserXP(challenge: {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: string | null
  title: string
  description: string
  level: number
  boilerplate: string | null
  tips: string | null
  tests: string
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user || !session.user.id) {
    throw new Error('User not authorized')
  }

  const userID = session.user.id
  let totalXP = 0

  const penalty = await prisma.experience.create({
    data: {
      userId: challenge.userId!,
      challengeId: challenge.id,
      value: -70,
    },
  })
  console.log('new user xp: ', { penalty })

  const experienceRecords = await prisma.experience.findMany({
    where: {
      userId: userID,
    },
  })

  for (let i = 0; i < experienceRecords.length; i++) {
    totalXP! += experienceRecords[i].value
    console.log('total: ', totalXP)
  }

  return { penalty }
}
