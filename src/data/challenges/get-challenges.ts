'use server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export const getAllChallenges = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return await prisma.challenge.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      submission: session?.user?.id ? {
        where: {
          userId: session.user.id
        },
        select: {
          passed: true,
        }
      } : undefined
    }
  });
};

export const getUserChallenges = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session || !session.user || !session.user.id) {
      throw new Error('User not authorized')
    }

    return await prisma.challenge.findMany({
      where: {
        submission: {
          some: {
            userId: session.user.id,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        submission: {
          where: {
            userId: session.user.id,
          },
          select: {
            passed: true,
          },
        },
      },
    })
  } catch (error) {
    console.error('Error fetching challenges for user:', error)
    throw error
  }
}

export const getSubmissionFromUser = async (challengeId: number) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session || !session.user || !session.user.id) {
      throw new Error('User not authorized')
    }

    return await prisma.submission.findUnique({
      where: {
        userId_challengeId: {
          userId: session.user.id,
          challengeId: challengeId,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching challenges for user:', error)
    throw error
  }
}
