'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 text-center">
      <h1 className="text-3xl font-bold">
        Alpaca Health Platform
      </h1>

      <p className="max-w-lg text-lg">
        Welcome to the Alpaca Health Platform, a platform for managing patient notes.
      </p>

      <div className="flex gap-2">
        <Link href="/notes/new">
          <button className="bg-[green] rounded-full px-4 py-2 text-white">Create a new patient note</button>
        </Link>
        <Link href="/notes">
        <button className="bg-[#DDD] rounded-full px-4 py-2 text-black">View all patient notes</button></Link>
      </div>
    </div>
  );
}
