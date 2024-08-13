import { env } from "@/env";
import { compareDesc, parseISO } from "date-fns";
import { z } from "zod";

const BASE_URL = "https://harvest.greenhouse.io/v1";
const AUTH_TOKEN = env.GREEN_HOUSE_API_KEY;

const headers = {
  Authorization: `Basic ${btoa(AUTH_TOKEN + ":")}`,
  "Content-Type": "application/json",
};

const ApplicationSchema = z.object({
  id: z.number(),
  applied_at: z.string(),
  jobs: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  current_stage: z.object({
    id: z.number(),
    name: z.string(),
  }),
  candidate_id: z.number(),
});

const ApplicationsSchema = z.array(ApplicationSchema);

const CandidatesSchema = z.array(z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
}));

async function fetchWrapper(
  route: string,
  options: RequestInit = {},
): Promise<unknown> {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      ...options,
      headers: { ...headers, ...options.headers },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as unknown;
  } catch (error) {
    console.error(`Error fetching from ${BASE_URL}${route}:`, error);
    throw error;
  }
}

function isApplications(
  value: unknown,
): value is z.infer<typeof ApplicationsSchema> {
  return ApplicationsSchema.safeParse(value).success;
}

function isCandidates(value: unknown): value is z.infer<typeof CandidatesSchema> {
  return CandidatesSchema.safeParse(value).success;
}

export const getApplications = async () => {
  const applications = await fetchWrapper("/applications");
  const candidates = await fetchWrapper(`/candidates`);
  const candidate_record: Record<number, {first_name: string, last_name: string}> = {}
  if (isCandidates(candidates)){
    candidates.map(({id, first_name, last_name}) => candidate_record[id] = {first_name, last_name })

    if (isApplications(applications)) {

        return applications.sort((a, b) =>
            compareDesc(parseISO(a.applied_at), parseISO(b.applied_at)),
            ).map((application) => {
                if(application.candidate_id in candidate_record) {
                    return {...application,
                        candidate_first_name: candidate_record[application.candidate_id]?.first_name,
                        candidate_last_name: candidate_record[application.candidate_id]?.last_name
                    }
                } else {
                    return {...application,
                    candidate_first_name: undefined,
                    candidate_last_name: undefined
                }
                }
            })
    }
}
};
