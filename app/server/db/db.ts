
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { env } from '@/env.mjs'

const connection = connect({
  host: env['DB_HOST'],
  username: env['DB_USERNAME'],
  password: env['DB_PASSWORD'],
});

export const db = drizzle(connection);