import { expect, test } from 'vitest';
import { createInnerTRPCContext } from '../trpc';
import { appRouter } from './root';

test('posts router', async () => {
  const ctx = createInnerTRPCContext({ session: null });
  const caller = appRouter.createCaller(ctx);

  const posts = await caller.post.all();
  expect(posts).toHaveLength(2);
});
