import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { DESIGN_CATEGORIES } from "@/lib/constants";

export const meetings = pgTable("meetings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Just a text field, no foreign key
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
  userId: text("user_id").notNull(),
  meetingId: integer("meeting_id").references(() => meetings.id),
  imageUrl: text("image_url").notNull(),
  basePrice: integer("base_price").notNull().default(0),
  finalPrice: integer("final_price").notNull().default(0),
  similarDesignsMinPrice: integer("similar_designs_min_price"),
  similarDesignsMaxPrice: integer("similar_designs_max_price"),
  notes: text("notes"),
  category: text("category").$type<(typeof DESIGN_CATEGORIES)[number]>(),
  minOrderQuantity: integer("min_order_quantity"),
  sizes: jsonb("sizes").$type<string[]>().default(["S", "M", "L", "XL"]),
  isShortlisted: boolean("is_shortlisted").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  source: text("source").default("direct").notNull(), // 'direct' or 'meeting'
});

export const sharedDesigns = pgTable("shared_designs", {
  id: serial("id").primaryKey(),
  designId: integer("design_id")
    .references(() => designs.id)
    .notNull(),
  userId: text("user_id").notNull(),
  sharedBy: text("shared_by").notNull(),
  shareCode: text("share_code").notNull().unique(),
  showPrice: boolean("show_price").default(true),
  showVendor: boolean("show_vendor").default(false),
  expiresAt: timestamp("expires_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  emoji: text("emoji"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const designsToCollections = pgTable("designs_to_collections", {
  id: serial("id").primaryKey(),
  designId: integer("design_id")
    .references(() => designs.id)
    .notNull(),
  collectionId: integer("collection_id")
    .references(() => collections.id)
    .notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
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

// Types and schemas
export type Meeting = InferSelectModel<typeof meetings>;
export type NewMeeting = InferInsertModel<typeof meetings>;
export type Design = InferSelectModel<typeof designs>;
export type NewDesign = InferInsertModel<typeof designs>;
export type Collection = InferSelectModel<typeof collections>;
export type NewCollection = InferInsertModel<typeof collections>;
export type SharedDesign = InferSelectModel<typeof sharedDesigns>;
export type NewSharedDesign = InferInsertModel<typeof sharedDesigns>;

// Schemas for validation
export const insertMeetingSchema = createInsertSchema(meetings);
export const selectMeetingSchema = createSelectSchema(meetings);
export const insertDesignSchema = createInsertSchema(designs);
export const selectDesignSchema = createSelectSchema(designs);
export const insertSharedDesignSchema = createInsertSchema(sharedDesigns);
export const selectSharedDesignSchema = createSelectSchema(sharedDesigns);

// Enhanced schemas with relations
export const meetingWithDesignsSchema = selectMeetingSchema.extend({
  designs: z.array(selectDesignSchema),
});

export type MeetingWithDesigns = z.infer<typeof meetingWithDesignsSchema>;
