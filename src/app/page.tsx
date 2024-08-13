import { getApplications } from "@/utils/api";
import { formatDistanceToNow } from "date-fns";

export default async function HomePage() {
  const applications = await getApplications();

  // console.log("applications", JSON.stringify(applications, null, 2));

  return (
    <div className="container flex flex-col gap-2 px-4">
      <h2 className="text-lg text-black">Applications</h2>
      {applications && (
        <div className="grid grid-cols-3 gap-4">
          {applications?.map(
            ({
              id,
              applied_at,
              jobs,
              current_stage,
              candidate_first_name,
              candidate_last_name,
            }) => (
              <div
                key={id}
                className="flex flex-col gap-2 rounded border border-gray-100 p-4"
              >
                {jobs.length === 1 && (
                  <p className="font-semibold">{jobs[0]?.name}</p>
                )}
                <div className="flex flex-row gap-6">
                  <div>
                    <p className="text-xs text-gray-600">Stage</p>
                    <p>{current_stage.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Applied</p>
                    <p>
                      {formatDistanceToNow(applied_at, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <br />
                {candidate_first_name && candidate_last_name ? (
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-sky-300">
                      <span className="text-xs font-semibold text-white">{`${candidate_first_name[0]}${candidate_last_name[0]}`}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Applicant</span>
                      <span>{`${candidate_first_name} ${candidate_last_name}`}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Applicant</span>
                      <span className="text-gray-500">
                        {"No applicant yet"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
