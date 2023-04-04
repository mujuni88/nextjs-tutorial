import { getRouteSession } from '@server/session';
import { db, insertPost } from '@server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getRouteSession(req, res);
  if (!session || !session?.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (req.method === 'POST') {
    try {
      await insertPost(db, {
        title: req.body.title,
        content: req.body.content,
        authorId: session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong', message: error });
    }
  }
}
