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
    <html lang="en" className={GeistMono.className}>
      <body className="m-0 h-full p-0">{children}</body>
    </html>
  );
}
