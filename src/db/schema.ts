import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    reference: varchar("reference", { length: 24 }).notNull().unique(),
    type: varchar("type", { length: 32 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    email: varchar("email", { length: 200 }).notNull(),
    phone: varchar("phone", { length: 60 }),
    company: varchar("company", { length: 180 }),
    propertyAddress: text("property_address"),
    propertyType: varchar("property_type", { length: 140 }),
    propertySize: varchar("property_size", { length: 140 }),
    services: text("services"),
    preferredDate: varchar("preferred_date", { length: 80 }),
    frequency: varchar("frequency", { length: 100 }),
    message: text("message"),
    sourcePage: varchar("source_page", { length: 120 }),
    status: varchar("status", { length: 32 }).notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("leads_created_at_idx").on(table.createdAt)],
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
