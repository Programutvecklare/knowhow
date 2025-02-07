'use server'

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export const getUserExperience = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || !session.user || !session.user.id) {
            return 0;
        }

        const userExperience = await prisma.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                experience: {
                    select: {
                        value: true
                    }
                }
            }
        });

        if (!userExperience?.experience) {
            return 0;
        }

        return userExperience.experience.reduce(
            (sum, exp) => sum + (exp.value || 0),
            0
        );

    } catch (error) {
        console.error('Error fetching experience for user:', error);
        return 0;
    }
};
