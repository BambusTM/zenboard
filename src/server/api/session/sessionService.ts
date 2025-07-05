import type {Context} from "@/server/api/trpc";
import type {Session} from "@prisma/client";
import {sessionRepo} from "@/server/api/session/sessionRepo";
import {authRepo} from "@/server/api/auth/authRepo";

export async function createSession(ctx: Context): Promise<Session> {
    let uniqueJoinCode = Math.floor((Math.random() * 999999) + 1);
    while (uniqueJoinCode == sessionRepo.findByJoinCode(uniqueJoinCode)) {
        uniqueJoinCode = Math.floor((Math.random() * 999999) + 1);
    }

    return await sessionRepo.create(ctx.db, {
        joinCode: uniqueJoinCode,
        participants: authRepo.findById()
    });
}
