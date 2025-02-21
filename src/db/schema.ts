import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
