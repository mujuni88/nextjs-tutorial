import { env } from '@/env.mjs';
import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

const connection = connect({
  host: env.PLANETSCALE_DB_HOST,
  username: env.PLANETSCALE_DB_USERNAME,
  password: env.PLANETSCALE_DB_PASSWORD,
});

export const db = drizzle(connection);
