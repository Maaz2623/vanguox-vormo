import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ADMIN", "MODERATOR", "USER"]);
export const eventTypeEnum = pgEnum("event_type", ["PUBLIC", "PRIVATE"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    oauthId: text("oauth_id").notNull().unique(),
    email: text("email").notNull().unique(),
    name: text("name"),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("email_idx").on(t.email)]
);

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  ownerEmail: text("owner_email")
    .references(() => users.email, {
      onDelete: "cascade",
    })
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
  active: boolean("active").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  organizationSlug: text("organization_slug")
    .references(() => organizations.slug, {
      onDelete: "cascade",
    })
    .notNull(),
  name: text("name").notNull(),
  type: eventTypeEnum().default("PUBLIC").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const memberships = pgTable("memberships", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userEmail: text("email")
    .references(() => users.email, {
      onDelete: "cascade",
    })
    .notNull(),
  organizationId: uuid("organziation_id")
    .references(() => organizations.id, {
      onDelete: "cascade",
    })
    .notNull(),
  memberRole: roleEnum().default("USER").notNull(),
});
