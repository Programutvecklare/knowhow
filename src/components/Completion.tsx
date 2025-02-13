'use client'

import { javascript } from '@codemirror/lang-javascript'
import { githubLight } from '@uiw/codemirror-theme-github'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import ReactCodeMirror from '@uiw/react-codemirror'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Completion({
  submissions,
  userSubmission,
}: {
  submissions: Submission[]
  userSubmission: Submission[]
}) {
  const { resolvedTheme } = useTheme()

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="flex justify-between items-center gap-4">
        <Button variant="outline" asChild>
          <Link href={`/challenges/${userSubmission[0].challengeId}`}>
            <ArrowLeft /> Challenge
          </Link>
        </Button>
        <Button asChild>
          <Link href="/challenges">
            Challenges <ArrowRight />
          </Link>
        </Button>
      </div>

      <div className="bg-muted rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Solution</h2>
        <ReactCodeMirror
          value={userSubmission[0].code}
          readOnly
          basicSetup={false}
          extensions={[javascript()]}
          className="w-full h-full"
          theme={resolvedTheme === 'dark' ? vscodeDark : githubLight}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Community Solutions</h2>
        <ul className="space-y-6">
          {submissions.map((submission: Submission) => {
            const submissionUser = submission.user?.name || 'Anonymous'

            return (
              <li
                key={submission.id}
                className="bg-muted rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-medium mb-3">
                  {submissionUser}&apos;s Solution
                </h3>
                <ReactCodeMirror
                  value={submission.code}
                  readOnly
                  basicSetup={false}
                  extensions={[javascript()]}
                  className="w-full h-full"
                  theme={resolvedTheme === 'dark' ? vscodeDark : githubLight}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
