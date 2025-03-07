// lib/db.ts
import { Pool } from "pg";

/**
 * In a Next.js app with serverless or hot-reloading,
 * we often put the Pool in a global variable so that
 * it's only created once. Otherwise, each reload could
 * create another pool, leading to many idle connections.
 */

// Augment the global namespace so TypeScript knows about our __pool
declare global {
  // eslint-disable-next-line no-var
  var __pool: Pool | undefined;
}

let pool: Pool;

console.log("DB URL from env:", process.env.POSTGRES_CONNECTION_URL);

// If there's no pool on the global object, create a new one
if (!global.__pool) {
  global.__pool = new Pool({
    connectionString: process.env.POSTGRES_CONNECTION_URL,
    ssl: { rejectUnauthorized: false }
    // If you need SSL for RDS, uncomment:
    // ssl: { rejectUnauthorized: false },
  });
}

// Now assign it so we can export
pool = global.__pool;

export default pool;
