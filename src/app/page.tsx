import Link from "next/link";

import { HydrateClient } from "@/trpc/server";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            ZEN | <span className="text-[hsl(280,100%,70%)]">BOARD</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="/auth"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Login →</h3>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="/profile"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Profile →</h3>
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
