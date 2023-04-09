import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { createTRPCRouter } from '../trpc';
import { postRouter } from './post';
import { authRouter } from './auth';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter
})

export type AppRouter = typeof appRouter;

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;