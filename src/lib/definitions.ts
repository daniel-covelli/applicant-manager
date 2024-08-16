import { z } from "zod";

export const CreateCandidateFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  last_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  job_id: z.string(),
  job_post_id: z.string(),
});

export type FormState =
  | {
      errors?: {
        first_name?: string[];
        last_name?: string[];
        email?: string[];
        job_id?: string[];
      };
      message?: string;
    }
  | undefined;

export const ApplicationSchema = z.object({
  id: z.number(),
  applied_at: z.string(),
  jobs: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .nullable(),
  current_stage: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(),
  prospect: z.boolean(),
  candidate_id: z.number(),
  job_post_id: z.number().nullable(),
});

const JobPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  location: z.object({
    id: z.number(),
    name: z.string(),
  }),
  first_published_at: z.string().nullable(),
  live: z.boolean(),
  job_id: z.number(),
  content: z.string(),
});

export const JobPostsSchema = z.array(JobPostSchema);

export const ApplicationsSchema = z.array(ApplicationSchema);

export const CandidateSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  applications: z.array(ApplicationSchema),
});
export const CandidatesSchema = z.array(CandidateSchema);

export function isApplications(
  value: unknown,
): value is z.infer<typeof ApplicationsSchema> {
  return ApplicationsSchema.safeParse(value).success;
}

export function isCandidate(
  value: unknown,
): value is z.infer<typeof CandidateSchema> {
  return CandidateSchema.safeParse(value).success;
}

export function isCandidates(
  value: unknown,
): value is z.infer<typeof CandidatesSchema> {
  return CandidatesSchema.safeParse(value).success;
}

export function isJobs(
  value: unknown,
): value is z.infer<typeof JobPostsSchema> {
  return JobPostsSchema.safeParse(value).success;
}

export function isJobPost(
  value: unknown,
): value is z.infer<typeof JobPostSchema> {
  return JobPostSchema.safeParse(value).success;
}
