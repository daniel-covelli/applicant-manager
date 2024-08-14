import Badge from "@/components/badge";

import { getCandidate } from "@/lib/api";
import Link from "next/link";

export default async function Layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { id: string } }>) {
  const candidate = await getCandidate(params.id);
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <Link href={"/"}>
              <h1 className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent">
                P@r@form Portal
              </h1>
            </Link>
            {candidate && (
              <div className="flex flex-row items-center gap-3">
                <p className="text-sm text-gray-700">
                  {`Hello, ${candidate?.first_name} ${candidate?.first_name}!`}
                </p>
                <Badge
                  initials={`${candidate?.first_name[0]}${candidate?.first_name[0]}`}
                />
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        {candidate ? (
          children
        ) : (
          <div className="flex h-52 w-full flex-col items-center justify-center rounded bg-slate-100">
            <p className="text-gray-800">
              Something went wrong, please try again later!
            </p>
          </div>
        )}
      </main>
    </>
  );
}
