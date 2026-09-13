import {
  index,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Table `leads` : demandes de projet envoyées depuis le formulaire de contact.
 * C'est la table de conversion du site (landing page publicitaire).
 */
export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 180 }).notNull(),
    company: varchar("company", { length: 160 }),
    budget: varchar("budget", { length: 60 }),
    service: varchar("service", { length: 80 }),
    message: text("message").notNull(),
    /** Origine du trafic (utm_source, referrer…) pour le suivi des campagnes */
    source: varchar("source", { length: 120 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("leads_created_at_idx").on(table.createdAt)],
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
