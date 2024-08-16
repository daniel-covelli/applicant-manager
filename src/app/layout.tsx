import "@/styles/globals.css";

import { GeistMono } from "geist/font/mono";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "P@r@form Jobs",
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
    <html lang="en" className={GeistMono.className}>
      <body className="m-0 h-full bg-slate-50 p-0">
        <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2">
              <Link href={"/"}>
                <h1 className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent">
                  P@r@form Portal
                </h1>
              </Link>
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
