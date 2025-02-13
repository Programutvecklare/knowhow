import Completion from '@/components/Completion'
import { getChallengeById } from '@/data/challenges/challenge'
import {
  getSubmissions,
  getUserSubmission,
} from '@/data/challenges/get-submissions'

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ challengeId: string }>
}) {
  const id = (await params).challengeId
  const challenge = await getChallengeById(id)

  const submissions = await getSubmissions(challenge.id)
  const userSubmission = await getUserSubmission(challenge.id)

  if (!submissions.length) return <h1>No submissions found</h1>

  return (
    <Completion submissions={submissions} userSubmission={userSubmission} />
  )
}
