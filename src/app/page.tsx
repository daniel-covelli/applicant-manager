import { getApplications } from "@/utils/api";


export default async function HomePage() {
  const applications = await getApplications()

  console.log('applications', JSON.stringify(applications, null, 2));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
          Applicant Manager App
        </h1>
      </div>
    </main>
  );
}
