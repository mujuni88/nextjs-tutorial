import { InferModel } from 'drizzle-orm';
import { mysqlTable, serial, text, timestamp } from 'drizzle-orm/mysql-core';
import { users } from '.';

export const posts = mysqlTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt').defaultNow().onUpdateNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
  authorId: text('authorId')
    .references(() => users.id)
    .notNull(),
});

export type Post = InferModel<typeof posts>;
export type NewPost = InferModel<typeof posts, 'insert'>;
