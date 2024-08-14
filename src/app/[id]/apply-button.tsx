"use client";

import { submitApplication } from "@/actions";
import Button, { ButtonLoading } from "@/components/button";
import { useState } from "react";

export default function ApplyButton(props: {
  candidateId: string;
  jobId: number;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        try {
          await submitApplication(props);
        } finally {
          // Not ideal but useActionState doesn't work yet
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      }}
    >
      <ButtonLoading loading={loading}>Apply</ButtonLoading>
    </Button>
  );
}
