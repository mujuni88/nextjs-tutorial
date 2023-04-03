import { NextApiRequest, NextApiResponse } from 'next';
import { db, posts } from '@server/db';
import { InferModel } from 'drizzle-orm';
import { getSession } from '@/app/server/session';

type NewPost = InferModel<typeof posts, 'insert'>;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ error: string }>
) {
  const session = await getSession();

  if (req.method === 'POST') {
    if (!session || !session?.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const body: NewPost = req.body;
      await db.insert(posts).values({
        title: body.title,
        content: body.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: session.user.id,
      });
      res.status(200).json({ error: 'Post created' });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
