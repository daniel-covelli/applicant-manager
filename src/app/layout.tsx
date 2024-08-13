import Button from "@/components/button";
import "@/styles/globals.css";

import { GeistMono } from "geist/font/mono";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Applicant Manger",
  description: "Made by Daniel Covelli",
  icons: [
    {
      rel: "icon",
      url: "https://em-content.zobj.net/source/apple/81/handshake_1f91d.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistMono.variable}`}>
      <body className="m-0 p-0">
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
      </body>
    </html>
  );
}
