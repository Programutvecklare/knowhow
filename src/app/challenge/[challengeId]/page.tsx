import Challenge from "@/components/Challenge"
import React from "react"
import { getChallengeById } from "@/data/challenges/challenge";

type Props = {
  params: {
    challengeId: string;
  };
};

export default async function ChallengePage({ params }: Props) {
  const { challengeId } = await params;
  const challenge = await getChallengeById(challengeId); 

  return (
    <div className="h-screen w-full flex flex-col">
      <Challenge {...challenge} />
    </div>
  );
}
