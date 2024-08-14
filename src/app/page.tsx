import Button from "@/components/button";
import GradientWrapper from "@/components/gradient-wrapper";
import { getCandidates } from "@/lib/api";

import Link from "next/link";

export default async function HomePage() {
  const candidates = await getCandidates();

  return (
    <GradientWrapper
      title={"Welcome"}
      sub="Select your profile or create a new account"
      footer={() => (
        <Button as={Link} href={"/create"}>
          Create an account
        </Button>
      )}
    >
      <div className="scrollbar-custom flex max-h-80 flex-col gap-2 overflow-y-scroll px-6 py-2">
        {candidates ? (
          candidates.map(({ id, first_name, last_name }) => (
            <Link
              key={id}
              href={`/${id}`}
              className="rounded-lg border border-gray-200 bg-white p-2 hover:bg-slate-50"
            >{`${first_name} ${last_name}`}</Link>
          ))
        ) : (
          <p>No candidates yet 🤷‍♂️</p>
        )}
      </div>
    </GradientWrapper>
  );
}
