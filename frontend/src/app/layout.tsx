import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Alpaca Health Platform",
  description: "Welcome to the Alpaca Health Platform, a platform for managing patient notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="fixed top-0 w-full left-0 text-center backdrop-blur-2xl">
          <Link href="/" className="flex justify-center items-center">
            <Image src="/logo.jpg" width={100} height={100} alt="" className="rounded-full me-4" />
            <span className="text-2xl text-gray-500">Patient Notes</span>
          </Link>
        </header>
        {children}
        <footer className="fixed bottom-0 text-sm text-gray-500 w-full left-0 text-center backdrop-blur-2xl py-8">
          <p>© Alpaca Notes App</p>
        </footer>
      </body>
    </html>
  );
}
