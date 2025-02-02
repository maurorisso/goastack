import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";
import { join } from "path";

// Load .env.local file
dotenv.config({ path: join(process.cwd(), ".env.local") });

const connectionString = process.env.DB_CONNECTION_STRING;

console.log("Database URL:", connectionString ? "Found" : "Not found");

const runMigrate = async () => {
  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in .env.local");
  }

  const sql = postgres(connectionString, {
    max: 1,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const db = drizzle(sql);

  console.log("⏳ Running migrations...");

  try {
    const start = Date.now();
    await migrate(db, { migrationsFolder: "./db/migrations" });
    const end = Date.now();
    console.log(`✅ Migrations completed in ${end - start}ms`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await sql.end();
  }

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
