"use client";

import {Navbar} from "@/components/Navbar";
import {useUser} from "@/components/provider/UserProvider";

export default function Home() {
    const user = useUser();

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar email={user?.email}/>
            <div className="container flex flex-col justify-center gap-12 px-4 py-16">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                    PROFILE
                </h1>
            </div>
        </main>
    );
}
