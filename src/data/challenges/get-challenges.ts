'use server'
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export const getChallenges = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || !session.user.id) {
      throw new Error("User not authorized");
    }

    return await prisma.challenge.findMany({
      where: {
        submission: {
          some: {
            userId: session.user.id
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        submission: {
          where: {
            userId: session.user.id
          },
          select: {
            passed: true
          }
        }
      }
    });

  } catch (error) {
    console.error('Error fetching challenges for user:', error);
    throw error;
  }
};
