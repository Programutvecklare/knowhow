'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function CreateChallenge() {
  const [title, setTitle] = useState('')
  const [instructions, setInstructions] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [tests, setTests] = useState('')
  const [boilerplate, setBoilerplate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, instructions, difficulty, tests, boilerplate })
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>New Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Challenge Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter challenge title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>

              <Textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Enter challenge instructions"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select onValueChange={setDifficulty} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Easy</SelectItem>
                  <SelectItem value="1">Medium</SelectItem>
                  <SelectItem value="2">Hard</SelectItem>
                  <SelectItem value="3">Extreme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tests">Tests</Label>

              <ReactCodeMirror
                value={tests}
                onChange={setTests}
                extensions={[javascript()]}
                placeholder="Enter tests"
                className="border rounded-lg w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="boilerplate">Boilerplate Code</Label>

              <ReactCodeMirror
                value={boilerplate}
                onChange={setBoilerplate}
                extensions={[javascript()]}
                placeholder="Enter boilerplate code"
                className="border rounded-lg w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Create Challenge
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
