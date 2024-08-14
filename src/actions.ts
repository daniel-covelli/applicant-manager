"use server";

import { createProspect } from "./lib/api";
import { redirect } from "next/navigation";
import { type FormState, SignupFormSchema } from "./lib/definitions";

export async function createAccount(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const prospect = await createProspect(validatedFields.data);

  if (prospect) {
    redirect(`/${prospect.id}`);
  }
}
