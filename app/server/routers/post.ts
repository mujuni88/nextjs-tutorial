import { z } from "zod";
import { posts } from "../db";
import { eq } from "drizzle-orm/expressions";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: protectedProcedure.query(({ctx}) => {
    return ctx.db.select().from(posts);
  }),
  byId: protectedProcedure.input(z.object({id: z.number()})).query(({ctx, input}) => {
    return ctx.db.select().from(posts).where(eq(posts.id, input.id));
  }),
  create: protectedProcedure.input(z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.string(),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
  })).mutation(({ctx, input}) => {
    return ctx.db.insert(posts).values(input)
  }),
  delete: protectedProcedure.input(z.object({id: z.number()})).mutation(({ctx, input}) => {
    return ctx.db.delete(posts).where(eq(posts.id, input.id));
  })
})