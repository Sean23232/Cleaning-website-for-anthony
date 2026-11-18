import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Accepts either DATABASE_URL (any hosted PostgreSQL provider) or
 * NETLIFY_DATABASE_URL, which Netlify DB provisions automatically.
 */
const databaseUrl =
  process.env.DATABASE_URL ??
  process.env.NETLIFY_DATABASE_URL ??
  process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL (or NETLIFY_DATABASE_URL) is required. See .env.example and DEPLOY.md.",
  );
}

const isLocal =
  databaseUrl.includes("127.0.0.1") || databaseUrl.includes("localhost");
const needsSsl = !isLocal && !/[?&]sslmode=/.test(databaseUrl);

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
    max: isLocal ? 10 : 5,
    ...(needsSsl ? { ssl: { rejectUnauthorized: false } } : {}),
  });

// Reuse the pool across warm serverless invocations as well as in dev.
globalForDb.__arenaNextJsPostgresqlPool = pool;

export const db = drizzle(pool);
