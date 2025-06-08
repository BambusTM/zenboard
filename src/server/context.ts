import { prisma } from './db';

export type Context = {
    db: typeof prisma;
    // other context fields, e.g. user session
};

export const createContext = (): Context => {
    return {
        db: prisma,
        // other context initialization
    };
};
