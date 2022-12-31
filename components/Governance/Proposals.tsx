import { ArrowUpIcon, CalendarIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../animations/Spinner";

type Proposal = {
  created: Date;
  startime: string;
  deadline: string;
  description: string;
  id: number;
  title: string;
};

const positions = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
    applicants: [
      {
        name: "Dries Vincent",
        email: "dries.vincent@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Lindsay Walton",
        email: "lindsay.walton@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Courtney Henry",
        email: "courtney.henry@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Tom Cook",
        email: "tom.cook@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
    applicants: [
      {
        name: "Whitney Francis",
        email: "whitney.francis@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Leonard Krasner",
        email: "leonard.krasner@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Floyd Miles",
        email: "floy.dmiles@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
    applicants: [
      {
        name: "Emily Selman",
        email: "emily.selman@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Kristin Watson",
        email: "kristin.watson@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Emma Dorsey",
        email: "emma.dorsey@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
];
function ProposalLabel({ startime, deadline }: { startime: string; deadline: string }) {
  const currentDate = new Date();
  if (currentDate < new Date(deadline)) {
    if (currentDate > new Date(startime)) {
      return (
        <span className="mr-1 inline-flex items-center justify-center rounded-full bg-green-100 px-2 py-0.5 text-sm font-medium text-green-800 md:mt-2 lg:mt-0">
          Open
        </span>
      );
    } else {
      return (
        <span className="mr-1 inline-flex items-center justify-center rounded-full bg-yellow-100 px-2 py-0.5 text-sm font-medium text-yellow-800 md:mt-2 lg:mt-0">
          Upcoming
        </span>
      );
    }
  }
  if (currentDate > new Date(deadline)) {
    return (
      <span className="mr-1 inline-flex items-center justify-center rounded-full bg-red-100 px-2 py-0.5 text-sm font-medium text-red-800 md:mt-2 lg:mt-0">
        Closed
      </span>
    );
  }
  return (
    <span className="mr-1 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-800 md:mt-2 lg:mt-0">
      Unknown
    </span>
  );
}

export default function Proposals() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [proposalsData, setProposalsData] = useState<Proposal[]>();

  async function getProposals() {
    try {
      setLoading(true);
      const res = await fetch(`https://rgtestnet.pythonanywhere.com/api/v1/qit/votes`, {});
      const data = await res.json();
      setProposalsData(data.votes);
      setLoading(false);
      console.log(proposalsData);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <span className="mb-2 text-gray-500">Loading Proposals...</span>
          <Spinner height={40} width={40} />
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {proposalsData?.map((proposal) => (
              <li key={proposal.id} className="cursor-pointer hover:bg-gray-50">
                <Link
                  href={{
                    pathname: `/proposalDetail/${encodeURIComponent(proposal.id)}`,
                    query: {
                      title: proposal.title,
                      description: proposal.description,
                      deadline: proposal.deadline,
                      startime: proposal.startime,
                    },
                  }}
                  className="block"
                >
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex flex-col text-lg text-left">
                          <div>
                            <p className="font-medium text-indigo-600 truncate">
                              {" "}
                              <ProposalLabel
                                deadline={proposal.deadline}
                                startime={proposal.startime}
                              />
                              {proposal.title}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-600 ">{proposal.description}</p>
                        </div>
                        {/* Deadline */}
                        <div className="flex mt-2">
                          <div className="flex items-center mr-2 text-sm text-gray-500">
                            <CalendarIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              Deadline:{" "}
                              <time dateTime={new Date(proposal.deadline).toTimeString()}>
                                {new Date(proposal.deadline).toLocaleDateString(undefined, {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </time>
                            </p>
                          </div>
                          {/* Start time */}
                          <div className="flex items-center text-sm text-gray-500">
                            <ArrowUpIcon
                              className="mr-0.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              Start Date:{" "}
                              <time>
                                {new Date(proposal.startime).toLocaleDateString(undefined, {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-5">
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
