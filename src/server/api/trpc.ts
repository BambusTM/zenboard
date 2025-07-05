import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { PrismaClient, type User } from "@prisma/client";
import type { NextRequest } from "next/server";
import { authRepo } from "@/server/api/auth/authRepo";

const prisma = new PrismaClient();

export type Context = {
  db: PrismaClient;
  req?: NextRequest;
  headers?: Headers;
  session: { user: User } | null;
};

export const createTRPCContext = async (opts?: {
  req?: NextRequest;
  headers?: Headers;
}): Promise<Context> => {
  const session = await authRepo.findById(prisma, 1);
  return {
    db: prisma,
    req: opts?.req,
    headers: opts?.headers,
    session: session ? { user: session } : null,
  };
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);