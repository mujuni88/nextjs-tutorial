import { NextApiRequest, NextApiResponse } from 'next';
import { Post, db, getPosts, posts } from '@server/db';
import { getSession } from '@/app/server/session';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | { error: string }>
) {
  const session = await getSession();

  if (req.method === 'GET') {
    if (!session || !session?.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const posts = await getPosts(db);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
