import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Git Gobbler - Process GitHub repositories for LLMs",
  description: "Git Gobbler processes GitHub repositories and archives into LLM-optimized XML format",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}>
        <header className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Git Gobbler Logo" width={64} height={64} />
            <span className="text-2xl font-bold">Git Gobbler</span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}