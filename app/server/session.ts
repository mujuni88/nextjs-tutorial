import { getServerSession } from 'next-auth/next';

import { authOptions } from '@server/auth';
import { NextApiRequest, NextApiResponse } from 'next';

// Getting the session in Next13 app/ directory
// https://next-auth.js.org/configuration/nextjs#in-app-directory
export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getRouteSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await getServerSession(req, res, authOptions);
}
