import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("DB_CONNECTION_STRING is not defined");
}

export default {
  schema: "./db/schemas/*", // points to your schema files
  out: "./db/migrations", // output directory for migrations
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_CONNECTION_STRING!,
  },
} satisfies Config;
