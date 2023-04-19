import { drizzle } from 'drizzle-orm/mysql2/index.js';
import { migrate } from 'drizzle-orm/mysql2/migrator.js';
import mysql from 'mysql2/promise';
import { env } from './env.mjs';

const poolConnection = mysql.createPool({
  host: env.PLANETSCALE_DB_HOST,
  user: env.PLANETSCALE_DB_USERNAME,
  password: env.PLANETSCALE_DB_PASSWORD,
  database: env.PLANETSCALE_DB,
  multipleStatements: true,
  ssl: { rejectUnauthorized: false },
});

const db = drizzle(poolConnection);

await migrate(db, {
  migrationsFolder: './migrations',
});
// add colors to the console output
console.log('\x1b[32m%s\x1b[0m', 'Migration complete', new Date());
