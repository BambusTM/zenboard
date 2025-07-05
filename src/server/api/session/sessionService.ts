import type {Context} from "@/server/api/trpc";
import type {Session} from "@prisma/client";
import {sessionRepo} from "./sessionRepo";
import {generateJoinCode} from "@/lib/utils";
import {prisma} from "@/server/db";

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

export async function joinSession(joinCode: string, userId: number, ctx: Context) {
    const session = await prisma.session.findUnique({
        where: { joinCode },
        include: {
            participants: true,
        },
    });
    if (!session) {
        throw new Error("Session not found");
    }

    const isParticipant = session.participants.some(p => p.userId === userId);
    if (isParticipant) {
        return session;
    }

    await sessionRepo.addParticipant(ctx.db, session.id, userId);

    return await sessionRepo.findById(ctx.db, session.id);
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
