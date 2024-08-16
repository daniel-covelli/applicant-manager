"use server";

import { createCandidate } from "./lib/api";
import { redirect, RedirectType } from "next/navigation";
import { CreateCandidateFormSchema, type FormState } from "./lib/definitions";
import { revalidatePath } from "next/cache";

export async function submitApplication(_: FormState, formData: FormData) {
  const validatedFields = CreateCandidateFormSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    job_id: formData.get("job_id"),
    job_post_id: formData.get("job_post_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const prospect = await createCandidate(validatedFields.data);

  if (prospect) {
    redirect(`/?status=success`);
  } else {
    redirect(`/apply/${validatedFields.data.job_post_id}?status=failure`);
  }
}
