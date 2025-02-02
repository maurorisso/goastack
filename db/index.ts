import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DB_CONNECTION_STRING!;

const client = postgres(connectionString);
const db = drizzle(client);

export default db;
