"use client";

import {Navbar} from "@/components/Navbar";
import {ZBUseUser} from "@/components/provider/UserProvider";

export default function boardPage() {
    const user = ZBUseUser();

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar email={user?.email}/>
            test
        </main>
    );
}


