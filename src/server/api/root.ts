import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import {authRouter} from "@/server/api/auth/authRouter";
import {boardRouter} from "@/server/api/board/boardRouter";
import {sessionRouter} from "@/server/api/session/sessionRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  board: boardRouter,
  session: sessionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
