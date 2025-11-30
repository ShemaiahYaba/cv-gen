// src/db/schema.ts
import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  jsonb,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ============================================
// PROFILES TABLE
// Extends Supabase auth.users with custom data
// ============================================
export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().notNull(),
    fullName: text("full_name").notNull(),
    avatarSeed: text("avatar_seed")
      .notNull()
      .default(sql`gen_random_uuid()::text`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    fullNameLength: check(
      "full_name_length",
      sql`char_length(${table.fullName}) >= 2 AND char_length(${table.fullName}) <= 100`
    ),
  })
);

// ============================================
// CVS TABLE
// Stores user CV documents
// ============================================
export const cvs = pgTable(
  "cvs",
  {
    id: uuid("id")
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id").notNull(),
    title: text("title").notNull(),
    cvType: text("cv_type").notNull(),
    templateId: text("template_id"),
    content: jsonb("content").notNull().default({}),
    isFavorite: boolean("is_favorite").notNull().default(false),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastAccessedAt: timestamp("last_accessed_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    cvTypeCheck: check(
      "cv_type_check",
      sql`${table.cvType} IN ('ats', 'custom', 'skill-based')`
    ),
    titleLength: check(
      "title_length",
      sql`char_length(${table.title}) >= 1 AND char_length(${table.title}) <= 200`
    ),
  })
);

// Type exports
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Cv = typeof cvs.$inferSelect;
export type NewCv = typeof cvs.$inferInsert;
