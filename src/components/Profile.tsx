export default function Profile({ challenges }: { challenges: Challenge[] }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mt-12">Profile</h1>
      <div className="w-full max-w-2xl mt-8">
        {challenges.length === 0 ? (
          <p className="text-center text-gray-500">
            No challenges attempted yet.
          </p>
        ) : (
          challenges.map((challenge) => (
            <div key={challenge.id} className="mb-4 p-4 border rounded-lg">
              <h2 className="text-xl font-semibold">{challenge.title}</h2>
              <p className="text-gray-600">{challenge.description}</p>
              <div className="mt-2">
                Status:{' '}
                {challenge.submission?.[0]?.passed ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-red-500">Not completed</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
