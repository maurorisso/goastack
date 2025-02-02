import { users } from "./user";
import { pgTable, uuid, text, boolean } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false),
  ownerId: uuid("owner_id")
    .references(() => users.id)
    .notNull(),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
