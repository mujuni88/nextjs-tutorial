import { TRPCError, initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import superjson from 'superjson';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerAuthSession } from './auth';
import { db } from './db';


// add drizzle db to context
type PromiseReturnType<T> = T extends Promise<infer U> ?  U : T;

type CreateTRPCContextOptions = {
  session: PromiseReturnType<ReturnType<typeof getServerAuthSession>>;
};

export const createInnerTRPCContext = (opts: CreateTRPCContextOptions) => {
  return {
    session:opts.session,
    db
  }
}

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({
    session,
  });
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
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

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
export const enforceIsAuthed = t.middleware(({ctx, next}) => {
    if (!ctx?.session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
        ctx: {
            ...ctx,
            session: {
                ...ctx.session, 
                user: ctx.session.user
            }
        }
    });
});

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceIsAuthed);
export const publicProcedure = t.procedure;
