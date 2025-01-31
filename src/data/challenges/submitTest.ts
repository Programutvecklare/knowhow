'use server'
// import judge0 from '@/lib/judge0'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function submitTest(code: string, challengeId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user || !session.user.id) {
    throw new Error('User not authorized')
  }

  // const judge0test = await judge0(code)

  try {
    console.log('Challenge ID:', challengeId)
    console.log('Code:', code)
    console.log('UserId:', session.user.id)
    const userId = session!.user.id

    const existingSubmission = await prisma.submission.findUnique({
      where: { userId_challengeId: { userId, challengeId } },
    })

    if (existingSubmission) {
      const updatedSubmission = await prisma.submission.update({
        where: { id: existingSubmission.id },
        data: { code, passed: false, createdAt: new Date() },
      })
      console.log('Updated submission:', updatedSubmission)
    } else {
      const newSubmission = await prisma.submission.create({
        data: { userId, challengeId, code, passed: false },
      })
      console.log('Created new submission:', newSubmission)
    }

    const submission = await prisma.submission.upsert({
      where: {
        userId_challengeId: { userId, challengeId }, // This must match the constraint name
      },
      update: {
        code,
        passed: false, // Reset passed status when updating
        createdAt: new Date(), // Update timestamp
      },
      create: {
        userId,
        challengeId,
        code,
        passed: false,
      },
    })

    return submission
  } catch (error) {
    console.error('Error saving submission:', error)
    return error
  }
}
