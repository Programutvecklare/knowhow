"use server"
import judge0 from "@/lib/judge0"

export default async function submitTest(code: string) {
    const judge0test = await judge0(code)
    return judge0test
}

