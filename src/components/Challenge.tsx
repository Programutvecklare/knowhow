'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { githubLight } from '@uiw/codemirror-theme-github'
import submitTest from '@/data/challenges/submitTest'
import getLevelDescription from '@/lib/level'
import { useTheme } from 'next-themes'
import { describe, test, expect } from '@/utils/testUtils'

export default function Challenge(challenge: Challenge) {
  const { resolvedTheme } = useTheme()
  const [code, setCode] = useState(`${challenge.boilerplate}`)
  const [showTips, setShowTips] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  const runTests = async () => {
    try {
      const judge0test = await submitTest(code)
      console.log(judge0test)

      new Function(code)()

      const context = {
        describe,
        test,
        expect,
      }

      const results = new Function(
        ...Object.keys(context),
        `${code}\n return ${challenge.tests}`
      )(...Object.values(context)) as Array<TestResult>

      setTestResults(
        results.map(
          (result) =>
            `${result.passed ? '✓' : '✗'} ${result.description}${
              result.error ? `\n   ${result.error}` : ''
            }`
        )
      )
    } catch (error) {
      console.error('Test error:', error)
      setTestResults([`Error running tests: ${error}`])
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] w-full flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50}>
          <div className="container mx-auto p-6">
            <div className="flex items-center gap-2 text-3xl font-bold mb-6">
              {challenge.title}
              <Badge>{getLevelDescription(challenge.level)}</Badge>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
              <div>{challenge.description}</div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 mt-6">Tips:</h2>
              <Button
                size="sm"
                onClick={() => setShowTips(!showTips)}
                className="mb-2 "
              >
                {showTips ? 'Hide Tips' : 'Show Tips'}
              </Button>
              {showTips && (
                <ul className="list-disc pl-5">
                  <li>{challenge.tips}</li>
                </ul>
              )}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <ReactCodeMirror
                value={code}
                onChange={setCode}
                extensions={[javascript()]}
                placeholder="Please enter JS code."
                className="w-full h-full"
                theme={resolvedTheme === 'dark' ? vscodeDark : githubLight}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25} className="flex ">
              <div className="h-full w-full flex p-2 tracking-wide flex-col">
                <span className="pl-2">Console</span>
                <span className="h-[1px] w-full mb-2 bg-zinc-300"></span>
                <div className="h-full">
                  <i>
                    {testResults.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {testResults.map((result, index) => (
                          <li
                            key={index}
                            className={
                              result.includes('✓')
                                ? 'text-green-600'
                                : 'text-red-600'
                            }
                          >
                            {result}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No tests run yet.</p>
                    )}
                  </i>
                </div>
                <Button onClick={runTests}>Run</Button>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
