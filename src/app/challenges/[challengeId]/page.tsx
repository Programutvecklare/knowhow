import Challenge from '@/components/Challenge'
import { getChallengeById } from '@/data/challenges/challenge'
import { getSubmissionFromUser } from '@/data/challenges/get-challenges'

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ challengeId: string }>
}) {
  const id = (await params).challengeId
  const challenge = await getChallengeById(id)
  const previousSubmission = await getSubmissionFromUser(challenge.id)

  return (
    <Challenge challenge={challenge} previousSubmission={previousSubmission} />
  )
}
