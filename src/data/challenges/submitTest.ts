"use server"
import judge0 from "@/lib/judge0"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function submitTest(code: string, challengeId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user || !session.user.id) {
    throw new Error("User not authorized")
  }

  // Send to Judge0
  const judge = await judge0(code)

  // Save user submission
  const userId = session!.user.id
  await prisma.submission.upsert({
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

  return judge
}
