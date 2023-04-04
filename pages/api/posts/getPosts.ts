import { db, getPosts } from '@server/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getRouteSession } from '@server/session';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getRouteSession(req, res);
  if (!session || !session?.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const posts = await getPosts(db);
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong', message: error });
    }
  }
}
