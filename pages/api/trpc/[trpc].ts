import { createNextApiHandler } from "@trpc/server/adapters/next";
import { AppRouter, appRouter } from '@/app/server/routers/root';
import { createTRPCContext as createContext } from '@server/trpc';

export default createNextApiHandler<AppRouter>({
  router: appRouter,
  /**
   * @link https://trpc.io/docs/context
   */
  createContext,
  /**
   * @link https://trpc.io/docs/error-handling
   */
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
      console.error('Something went wrong', error);
    }
  },
  /**
   * Enable query batching
   */
  batching: {
    enabled: true,
  },
});
