import Profile from '@/components/Profile'
import { getChallenges } from '@/data/challenges/get-challenges'

export default async function ProfilePage() {
  const challenges = await getChallenges()

  return <Profile challenges={challenges} />
}
