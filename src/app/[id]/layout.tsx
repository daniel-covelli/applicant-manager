import Button from "@/components/button";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <h1 className="text-xl font-bold text-gray-900">
              🤝 Application Manager
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
