export default async function judge0(code: string) {
  const response = await fetch(process.env.JUDGE0_URL as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language_id: 63,
      source_code: code,
    }),
  })

  const data = response.json()
  return data
}
