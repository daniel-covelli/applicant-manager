import "server-only";

import { env } from "@/env";
import { compareDesc, parseISO } from "date-fns";
import { type z } from "zod";
import {
  ApplicationsSchema,
  CandidatesSchema,
  isApplications,
  isCandidate,
  isCandidates,
  type SignupFormSchema,
} from "./definitions";

const BASE_URL = "https://harvest.greenhouse.io/v1";
const AUTH_TOKEN = env.GREEN_HOUSE_API_KEY;
const USER_ID = env.USER_ID;

const headers = {
  Authorization: `Basic ${btoa(AUTH_TOKEN + ":")}`,
  "Content-Type": "application/json",
};

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
      console.error("Response status:", response.status);
      console.error("Response status text:", response.statusText);

      response
        .text()
        .then((text) => {
          console.error("Response body:", text);
        })
        .catch((err) => {
          console.error("Error reading response body:", err);
        });

      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as unknown;
  } catch (error) {
    console.error(`Error fetching from ${BASE_URL}${route}:`, error);
    throw error;
  }
}

export const getApplications = async () => {
  const applications = await fetchWrapper("/applications");
  const candidates = await fetchWrapper(`/candidates`);
  const candidate_record: Record<
    number,
    { first_name: string; last_name: string }
  > = {};
  if (isCandidates(candidates)) {
    candidates.map(
      ({ id, first_name, last_name }) =>
        (candidate_record[id] = { first_name, last_name }),
    );

    if (isApplications(applications)) {
      return applications
        .sort((a, b) =>
          compareDesc(parseISO(a.applied_at), parseISO(b.applied_at)),
        )
        .map((application) => {
          if (application.candidate_id in candidate_record) {
            return {
              ...application,
              candidate_first_name:
                candidate_record[application.candidate_id]?.first_name,
              candidate_last_name:
                candidate_record[application.candidate_id]?.last_name,
            };
          } else {
            return {
              ...application,
              candidate_first_name: undefined,
              candidate_last_name: undefined,
            };
          }
        });
    }
  }
};

export const getCandidates = async () => {
  const candidates = await fetchWrapper(`/candidates`);
  if (isCandidates(candidates)) {
    return candidates;
  }
};

export const createProspect = async ({
  first_name,
  last_name,
  email,
}: z.infer<typeof SignupFormSchema>) => {
  const prospect = await fetchWrapper("/prospects", {
    method: "POST",
    headers: { "On-Behalf-Of": USER_ID },
    body: JSON.stringify({
      first_name,
      last_name,
      email_addresses: [{ value: email, type: "personal" }],
    }),
  });

  if (isCandidate(prospect)) {
    console.log("prospect", JSON.stringify(prospect, null, 2));

    return prospect;
  }
};
