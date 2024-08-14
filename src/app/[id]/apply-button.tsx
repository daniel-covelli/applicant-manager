"use client";

import { submitApplication } from "@/actions";
import Button from "@/components/button";

export default function ApplyButton(props: {
  candidateId: string;
  jobId: number;
}) {
  return (
    <Button onClick={async () => await submitApplication(props)}>Apply</Button>
  );
}
