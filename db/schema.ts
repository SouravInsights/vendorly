import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

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

export const designs = pgTable("designs", {
  id: serial("id").primaryKey(),
  meetingId: integer("meeting_id")
    .references(() => meetings.id)
    .notNull(),
  imageUrl: text("image_url").notNull(),
  // Base price (initial quoted price)
  basePrice: numeric("base_price").notNull(),
  // Final price after negotiation (if any)
  finalPrice: numeric("final_price").notNull(),
  // Price range of similar designs seen (optional)
  similarDesignsMinPrice: numeric("similar_designs_min_price"),
  similarDesignsMaxPrice: numeric("similar_designs_max_price"),
  // Existing fields
  notes: text("notes"),
  category: text("category"), // e.g., 'lehenga', 'saree', etc.
  minOrderQuantity: integer("min_order_quantity"),
  sizes: jsonb("sizes").$type<string[]>().default(["S", "M", "L", "XL"]),
  isShortlisted: boolean("is_shortlisted").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

export type Meeting = InferSelectModel<typeof meetings>;
export type NewMeeting = InferInsertModel<typeof meetings>;
export type Design = InferSelectModel<typeof designs>;
export type NewDesign = InferInsertModel<typeof designs>;

// Schemas for validation
export const insertMeetingSchema = createInsertSchema(meetings);
export const selectMeetingSchema = createSelectSchema(meetings);
export const insertDesignSchema = createInsertSchema(designs);
export const selectDesignSchema = createSelectSchema(designs);

// Enhanced schemas with relations
export const meetingWithDesignsSchema = selectMeetingSchema.extend({
  designs: z.array(selectDesignSchema),
});

export type MeetingWithDesigns = z.infer<typeof meetingWithDesignsSchema>;
