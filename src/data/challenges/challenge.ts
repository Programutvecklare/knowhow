'use server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export const getChallengeById = async (id: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user || !session.user.id) {
    throw new Error('User not authorized');
  }

  const challengeId = parseInt(id, 10);

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  if (!challenge) {
    throw new Error(`Challenge with ID ${id} not found.`);
  }

  return challenge;
};
