import { z } from "zod";

export const SignupFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  last_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

export type FormState =
  | {
      errors?: {
        first_name?: string[];
        last_name?: string[];
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export const ApplicationSchema = z.object({
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

export const ApplicationsSchema = z.array(ApplicationSchema);
export const CandidateSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
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
