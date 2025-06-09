import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { PrismaClient } from "@prisma/client";
import type {NextRequest} from "next/server";

const prisma = new PrismaClient();

export type Context = {
  db: PrismaClient;
  req?: NextRequest; // Stores the whole request
  headers?: Headers;
};

export const createTRPCContext = async (opts?: { req?: NextRequest; headers?: Headers }): Promise<Context> => {
  return {
    db: prisma,
    req: opts?.req,
    headers: opts?.headers,
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
