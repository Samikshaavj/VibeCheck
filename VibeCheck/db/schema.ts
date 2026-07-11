import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  credits: integer("credits").default(1000).notNull(),
});

export const repositories = pgTable("repositories", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  repoId: text("repo_id").notNull().unique(),
  name: text("name"),
  full_name: text("full_name"),
  private: text("private"),
  html_url: text("html_url"),
  description: text("description"),
  // updatedAt: timestamp("updated_at").defaultNow().notNull(),
  // created_at:text("created_at"),
  // default_branch:text("default_branch"),
  // language:text("language"),
  owner: text("owner").notNull(),
})

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  authorId: serial("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
