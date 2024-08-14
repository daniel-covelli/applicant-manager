import { type PropsWithChildren } from "react";

const GradientWrapper = ({
  children,
  title,
  sub,
  footer: Footer,
}: PropsWithChildren<{
  title: string;
  sub: string;
  footer: React.ComponentType;
}>) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <main className="w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className="flex flex-col gap-2 py-6">
          <h1 className="px-6 text-2xl font-semibold text-black">{title}</h1>
          <h2 className="text-md px-6 text-gray-700">{sub}</h2>
          <div className="my-2 border-b border-t border-gray-200">
            {children}
          </div>

          <div className="flex justify-center px-6">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GradientWrapper;
