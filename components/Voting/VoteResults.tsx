export function VoteResults({
  votingOptions,
  totalVotes,
}: {
  votingOptions: any[];
  totalVotes: number;
}) {
  return (
    <div>
      {votingOptions.map((option: any, idx: any) => (
        <div key={idx}>
          <div className="relative p-4 my-4 overflow-hidden border border-gray-200 rounded-lg hover:border-indigo-500">
            <div
              style={{ transform: `scaleX(${option.votes / totalVotes})` }}
              className="absolute inset-0 w-full origin-left bg-indigo-500 bg-opacity-50"
            ></div>
            <div className="relative text-black z-100">
              <div className="font-medium">{option.description}</div>
              <div className="text-sm">{option.votes} voters</div>
              <div className="text-sm">
                295.7513474746361 QNTFI ({Math.round((option.votes / totalVotes) * 100)}%)
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
