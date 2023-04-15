import { eq } from 'drizzle-orm/expressions';
import { z } from 'zod';
import { posts, users } from '../db';
import { createTRPCRouter, protectedProcedure } from '../trpc';

const postCols = {
  id: posts.id,
  title: posts.title,
  content: posts.content,
  createdAt: posts.createdAt,
  updatedAt: posts.updatedAt,
  authorId: posts.authorId,
  userName: users.name,
  userEmail: users.email,
  userAvatar: users.image,
};

export const postRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select(postCols)
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id));
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select(postCols)
        .from(posts)
        .leftJoin(users, eq(posts.authorId, users.id))
        .where(eq(posts.id, input.id))
        .limit(1);
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        authorId: z.string(),
        createdAt: z.date().default(() => new Date()),
        updatedAt: z.date().default(() => new Date()),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(posts).values(input);
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(posts).where(eq(posts.id, input.id));
    }),
});
