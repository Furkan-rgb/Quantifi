export interface Proposal {
  state: "open" | "closed" | "upcoming" | "string" | undefined;
  deadline: string;
  description: string;
  id: number;
  startime: string;
  title: string;
}

export function returnProposalState(_startTime: string, _deadline: string) {
  const now = new Date();
  const deadline = new Date(_deadline);
  const startTime = new Date(_startTime);
  if (now < deadline) {
    if (now > startTime) {
      return "open";
    } else {
      return "upcoming";
    }
  }
  if (now > deadline) {
    return "closed";
  }
}

export function returnProposalLabel(state: Proposal["state"]) {
  if (state === "open") {
    return (
      <div className="mr-1 inline-flex items-center justify-center rounded-full bg-green-100 px-2 py-0.5 text-sm font-medium text-green-800 md:mt-2 lg:mt-0">
        Open
      </div>
    );
  }
  if (state === "upcoming") {
    return (
      <div className="mr-1 inline-flex items-center justify-center rounded-full bg-yellow-100 px-2 py-0.5 text-sm font-medium text-yellow-800 md:mt-2 lg:mt-0">
        Upcoming
      </div>
    );
  }
  if (state === "closed") {
    return (
      <div className="mr-1 inline-flex items-center justify-center rounded-full bg-red-100 px-2 py-0.5 text-sm font-medium text-red-800 md:mt-2 lg:mt-0">
        Closed
      </div>
    );
  }
  return (
    <div className="mr-1 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-800 md:mt-2 lg:mt-0">
      Unknown
    </div>
  );
}
