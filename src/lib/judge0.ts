export default async function judge0(code: string) {
  try {
    const response = await fetch(
      `http://${process.env.JUDGE0_URL as string}/submissions?wait=true`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language_id: 63,
          source_code: code,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Judge0 API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Judge0 request failed:', error)
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
