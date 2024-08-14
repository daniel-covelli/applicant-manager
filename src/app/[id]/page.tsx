import Card, { CardGrid } from "@/components/card";
import { getApplications, getCandidate, getJobs } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import ApplyButton from "./apply-button";
import { type CandidateSchema } from "@/lib/definitions";
import { type z } from "zod";
import LineBreak from "@/components/linebreak";
import Badge from "@/components/badge";

const generateSetUserHasAlreadyAppliedTo = (
  candidate: z.infer<typeof CandidateSchema> | undefined,
) => {
  const appliedToJobIds = new Set();
  candidate?.applications.map(({ jobs }) =>
    jobs?.map(({ id }) => appliedToJobIds.add(id)),
  );

  return appliedToJobIds;
};

export default async function HomePage({ params }: { params: { id: string } }) {
  const [allApplications, jobs, candidate] = await Promise.all([
    getApplications(),
    getJobs(),
    getCandidate(params.id),
  ]);

  const appliedToJobIds = generateSetUserHasAlreadyAppliedTo(candidate);

  return (
    <div className="flex flex-col gap-6 px-4">
      <div>
        <h3 className="pb-2 text-lg text-black">Job posts</h3>
        <CardGrid>
          {jobs?.map(({ id, title, location, first_published_at, job_id }) => (
            <Card
              key={id}
              title={title}
              data={[
                { label: "Location", value: location.name },
                ...(first_published_at
                  ? [
                      {
                        label: "Published",
                        value: formatDistanceToNow(first_published_at, {
                          addSuffix: true,
                        }),
                      },
                    ]
                  : []),
              ]}
              footer={() =>
                appliedToJobIds.has(job_id) ? (
                  <div className="flex w-fit flex-row items-center gap-2 rounded px-1">
                    <p className="text-teal-700">Applied</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 text-teal-700"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                ) : (
                  <ApplyButton candidateId={params.id} jobId={job_id} />
                )
              }
            />
          ))}
        </CardGrid>
      </div>

      <div>
        <h3 className="pb-2 text-lg text-black">Your applications</h3>
        {candidate?.applications && candidate.applications.length > 0 ? (
          <CardGrid>
            {candidate.applications.map(
              ({ id, applied_at, jobs, current_stage }) => (
                <Card
                  key={id}
                  title={
                    jobs?.length === 1 && jobs[0]?.name ? jobs[0].name : ""
                  }
                  data={[
                    ...(current_stage
                      ? [{ label: "Stage", value: current_stage.name }]
                      : []),
                    {
                      label: "Applied",
                      value: formatDistanceToNow(applied_at, {
                        addSuffix: true,
                      }),
                    },
                  ]}
                  footer={() => (
                    <div className="flex items-center space-x-2">
                      <Badge
                        initials={`${candidate.first_name[0]}${candidate.last_name[0]}`}
                      />

                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Applicant</span>
                        <span className="text-sm">{`${candidate.first_name} ${candidate.first_name}`}</span>
                      </div>
                    </div>
                  )}
                />
              ),
            )}
          </CardGrid>
        ) : (
          <div className="flex h-52 w-full flex-col items-center justify-center rounded bg-slate-100">
            <p className="text-gray-800">No applications yet, apply above!</p>
          </div>
        )}
      </div>
      <LineBreak />
      <div>
        <h2 className="pb-2 text-lg text-black">All applications</h2>
        {allApplications && (
          <CardGrid>
            {allApplications?.map(
              ({
                id,
                applied_at,
                jobs,
                current_stage,
                candidate_first_name,
                candidate_last_name,
              }) => (
                <Card
                  key={id}
                  title={
                    jobs?.length === 1 && jobs[0]?.name ? jobs[0].name : ""
                  }
                  data={[
                    ...(current_stage
                      ? [{ label: "Stage", value: current_stage.name }]
                      : []),
                    {
                      label: "Applied",
                      value: formatDistanceToNow(applied_at, {
                        addSuffix: true,
                      }),
                    },
                  ]}
                  footer={() =>
                    candidate_first_name && candidate_last_name ? (
                      <div className="flex items-center space-x-2">
                        <Badge
                          initials={`${candidate_first_name[0]}${candidate_last_name[0]}`}
                        />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">
                            Applicant
                          </span>
                          <span className="text-sm">{`${candidate_first_name} ${candidate_last_name}`}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">
                            Applicant
                          </span>
                          <span className="text-gray-500">
                            No applicant yet
                          </span>
                        </div>
                      </div>
                    )
                  }
                />
              ),
            )}
          </CardGrid>
        )}
      </div>
    </div>
  );
}
