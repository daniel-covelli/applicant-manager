"use client";

import { submitApplication } from "@/actions";
import Button from "@/components/button";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      <div
        className={clsx("flex w-16 justify-center", !pending && "hidden")}
        role="status"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4 animate-spin fill-white text-gray-200 dark:text-gray-400"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <span className={clsx("h-16 w-16", pending && "hidden")}>Apply</span>
    </Button>
  );
}

export default function Form({
  job_id,
  job_post_id,
}: {
  job_id: number;
  job_post_id: string;
}) {
  const [state, action] = useFormState(submitApplication, undefined);
  return (
    <form className="h-fit rounded-lg bg-white p-8 shadow-lg" action={action}>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl">Apply for this role!</h2>
        <Field>
          <Label className="text-xs font-medium leading-none text-gray-600">
            First name
          </Label>
          <Input
            autoFocus
            className={clsx(
              "mt-1 w-full rounded-lg border-none bg-gray-100 px-3 py-1.5 text-sm/6 text-black",
              "data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-800 focus:outline-none",
            )}
            placeholder="First name"
            name="first_name"
            id="first_name"
          />

          {state?.errors?.last_name && (
            <p className="pt-1 text-xs text-red-600">
              {state.errors.last_name}
            </p>
          )}
        </Field>
        <Field>
          <Label className="text-xs font-medium leading-none text-gray-600">
            Last name
          </Label>
          <Input
            className={clsx(
              "mt-1 w-full rounded-lg border-none bg-gray-100 px-3 py-1.5 text-sm/6 text-black",
              "data-[focus]:outline-gray/25 data-[focus]:outline-2 data-[focus]:-outline-offset-2 focus:outline-none",
            )}
            placeholder="Last name"
            name="last_name"
            id="last_name"
          />
          {state?.errors?.last_name && (
            <p className="pt-1 text-xs text-red-600">
              {state.errors.last_name}
            </p>
          )}
        </Field>

        <Field>
          <Label className="text-xs font-medium text-gray-600">Email</Label>
          <Input
            autoFocus
            className={clsx(
              "mt-1 w-full rounded-lg border-none bg-gray-100 px-3 py-1.5 text-sm/6 text-black",
              "data-[focus]:outline-gray/25 data-[focus]:outline-2 data-[focus]:-outline-offset-2 focus:outline-none",
            )}
            placeholder="Email address"
            name="email"
            id="email"
          />
          {state?.errors?.email && (
            <p className="pt-1 text-xs text-red-600">{state.errors.email}</p>
          )}
        </Field>

        <Input hidden name="job_id" id="job_id" value={job_id} />
        <Input hidden name="job_post_id" id="job_post_id" value={job_post_id} />

        {state?.errors?.job_id && (
          <p className="pt-1 text-xs text-red-600">{state.errors.job_id}</p>
        )}
        <SubmitButton />
      </div>
    </form>
  );
}
