import Profile from '@/components/Profile'
import {
  getAllChallenges,
  getUserChallenges,
} from '@/data/challenges/get-challenges'

export default async function ProfilePage() {
  const challenges = await getUserChallenges()
  const userChallenges = await getAllChallenges()

  return <Profile challenges={challenges} userChallenges={userChallenges} />
}
