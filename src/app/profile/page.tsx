import Profile from '@/components/Profile'
import { getUserChallenges } from '@/data/challenges/get-challenges'

export default async function ProfilePage() {
  const challenges = await getUserChallenges()

  return <Profile challenges={challenges} />
}
