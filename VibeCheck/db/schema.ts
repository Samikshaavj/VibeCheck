import { pgTable, serial, text, timestamp, integer, varchar, jsonb } from "drizzle-orm/pg-core";

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
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  created_at: text("created_at"),
  default_branch: text("default_branch"),
  language: text("language"),
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

export const TestCasesTable = pgTable("test_cases", {
  id: serial("id").primaryKey(),

  // User / project details
  userId: varchar("user_id", { length: 255 }).notNull(),
  repoId: varchar("repo_id", { length: 255 }),
  repoName: varchar("repo_name", { length: 255 }).notNull(),
  repoOwner: varchar("repo_owner", { length: 255 }).notNull(),
  branch: varchar("branch", { length: 100 }).default("main"),

  // Main test case data
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description").notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  priority: varchar("priority", { length: 50 }).notNull(),

  // Important metadata for second step: Browserbase script generation
  targetRoute: varchar("target_route", { length: 500 }),
  targetFiles: jsonb("target_files").$type<string[]>().default([]),
  expectedResult: text("expected_result"),

  // Later you can update these fields
  browserbaseScript: text("browserbase_script"),
  status: varchar("status", { length: 100 }).default("generated"),

  createdAt: timestamp("created_at").defaultNow(),
});
