import {
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { users } from '.';
import { InferModel } from 'drizzle-orm';
import { PlanetScaleDatabase } from 'drizzle-orm/planetscale-serverless';

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

export async function insertPost(
  db: PlanetScaleDatabase,
  post: NewPost
): Promise<any> {
  return db.insert(posts).values(post);
}

export async function getPosts(db: PlanetScaleDatabase): Promise<Post[]> {
  return db.select().from(posts);
}
