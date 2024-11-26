import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  json,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Meetings table to store vendor meetings
export const meetings = pgTable("meetings", {
  id: serial("id").primaryKey(),
  vendorName: text("vendor_name").notNull(),
  location: text("location").notNull(),
  phoneNumber: text("phone_number"),
  meetingDate: timestamp("meeting_date").defaultNow().notNull(),
  notes: text("notes"),
  followUpDate: timestamp("follow_up_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Designs captured during meetings
export const designs = pgTable("designs", {
  id: serial("id").primaryKey(),
  meetingId: integer("meeting_id").references(() => meetings.id),
  imageUrl: text("image_url").notNull(),
  price: integer("price").notNull(), // Store price in paise (1 INR = 100 paise)
  notes: text("notes"),
  category: text("category"), // e.g., 'lehenga', 'saree', etc.
  minOrderQuantity: integer("min_order_quantity"),
  sizes: json("sizes").$type<string[]>(), // Available sizes
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isShortlisted: boolean("is_shortlisted").default(false),
});

// Relations
export const meetingsRelations = relations(meetings, ({ many }) => ({
  designs: many(designs),
}));

export const designsRelations = relations(designs, ({ one }) => ({
  meeting: one(meetings, {
    fields: [designs.meetingId],
    references: [meetings.id],
  }),
}));
