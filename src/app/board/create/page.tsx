"use client";

import {Navbar} from "@/components/Navbar";
import {ZBUseUser} from "@/components/provider/UserProvider";

export default function createPage() {
    const user = ZBUseUser();

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar email={user?.email}/>
            <div className="flex justify-center items-center grow">
                <div className="flex flex-col items-center grow-1">
                    <h2>Create zenboard</h2>
                </div>
                <div className="flex flex-col items-center">
                    <h2>Invite colaborators</h2>
                </div>
            </div>
        </main>
    );
}
