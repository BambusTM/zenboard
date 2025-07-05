import type {Context} from "@/server/api/trpc";
import type {Session} from "@prisma/client";
import {sessionRepo} from "./sessionRepo";
import {generateJoinCode} from "@/lib/utils";

export async function createSession(ctx: Context, creatorId: number): Promise<Session> {
    const joinCode = await generateUniqueJoinCode(ctx);

    return await sessionRepo.create(ctx.db, {
        joinCode,
        participants: {
            create: {
                userId: creatorId,
            }
        }
    });
}

async function generateUniqueJoinCode(ctx: Context): Promise<string> {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
        const joinCode = generateJoinCode();
        const existing = await sessionRepo.findByJoinCode(ctx.db, joinCode);

        if (!existing) {
            return joinCode;
        }

        attempts++;
    }

    throw new Error("Failed to generate unique join code after multiple attempts");
}
