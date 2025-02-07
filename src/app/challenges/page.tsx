import Challenges from '@/components/Challenges'
import { getAllChallenges } from '@/data/challenges/get-challenges'

export default async function ChallengesPage() {
  const challenges = await getAllChallenges()

  return <Challenges challenges={challenges} />
}
