import Button from "@/components/button";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <h1 className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent">
              P@r@form Portal
            </h1>
            <Button variant="outlined">Add an applicant</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
}
