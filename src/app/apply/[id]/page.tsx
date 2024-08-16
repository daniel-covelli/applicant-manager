import { getJobPost } from "@/lib/api";
import Form from "./form";
import { formatDistanceToNow } from "date-fns";
import Badge from "@/components/badge";
import Toast from "../../../components/toast";

export default async function ApplyPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJobPost(params.id);

  return job ? (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-2xl md:text-4xl">{job.title}</h1>
            {job.first_published_at && (
              <p className="text-sm text-gray-700">{`Opened ${formatDistanceToNow(
                job.first_published_at,
                {
                  addSuffix: true,
                },
              )}`}</p>
            )}
          </div>
          <div>
            <h2 className="text-xs text-gray-700">Description</h2>
            <p>{job.content}</p>
          </div>
          <div>
            <h2 className="text-xs text-gray-700">Location</h2>
            <p className="text-xl">{job.location.name}</p>
          </div>
          {job.otherCandidates.length > 0 && (
            <div className="hidden flex-col gap-2 lg:flex">
              <h2 className="text-xs text-gray-700">
                Candidates who have applied
              </h2>
              <div className="scrollbar-custom flex h-80 flex-col gap-2 overflow-y-auto">
                {job.otherCandidates.map(({ id, first, last }) => (
                  <div key={id} className="flex flex-row items-center gap-2">
                    <Badge initials={`${first[0]}${last[0]}`} />
                    {first} {last}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Form job_id={job.job_id} job_post_id={params.id} />
    </div>
  ) : (
    <div>nothin</div>
  );
}
