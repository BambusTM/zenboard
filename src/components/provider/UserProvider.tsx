"use client";

import {type ReactNode, useEffect, useState, createContext, useContext } from "react";
import type { User } from "@prisma/client";

const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored) as User);
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
    return useContext(UserContext);
}
