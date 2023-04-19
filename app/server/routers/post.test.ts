import { describe, expect, test } from 'vitest';
import { createInnerTRPCContext } from '../trpc';
import { appRouter } from './root';

describe('post', () => {
  test('posts.all', async () => {
    const ctx = createInnerTRPCContext({
      session: {
        user: { id: 'test' },
        expires: '2023-09-09',
      },
    });
    const caller = appRouter.createCaller(ctx);

    const posts = await caller.post.all();
    expect(posts).toHaveProperty('length');
  });

  /*
  test('posts.insert', async () => {
    type Input = RouterInputs['post']['create'];
    const userId = 'jb';
    const ctx = createInnerTRPCContext({
      session: {
        user: { id: userId },
        expires: '2023-09-09',
      },
    });

    const input: Input = {
      title: 'test',
      content: 'test',
      authorId: userId,
    };

    const caller = appRouter.createCaller(ctx);
    await caller.post.create(input);
    const post = await caller.post.byId({ id: 1 });
    expect(post).toMatchObject(input);
  });
  */
});
