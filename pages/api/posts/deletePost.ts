import { db, deletePost } from '@/app/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    console.log('DELETE id', id);
    try {
      const post = await deletePost(db, id);
      console.log('After deletePost', post);
      res.status(200).json(post);
    } catch (err) {
      console.error('Error in deletePost', err);
      res.status(500).json({ message: err });
    }
  }
}
