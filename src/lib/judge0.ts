export default async function judge0(code: string) {
  const judge0Response = await fetch(
    'http://37.27.6.76:2358/submissions?wait=true',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language_id: 63,
        source_code: code,
      }),
    }
  )
  console.log(judge0Response)
  return judge0Response
}
