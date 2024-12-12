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

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const meetings = pgTable("meetings", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
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
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  meetingId: integer("meeting_id").references(() => meetings.id),
  imageUrl: text("image_url").notNull(),
  // New price fields
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
  source: text("source").default("direct").notNull(),
});

export const sharedDesigns = pgTable("shared_designs", {
  id: serial("id").primaryKey(),
  designId: integer("design_id")
    .references(() => designs.id)
    .notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  sharedBy: text("shared_by").notNull(), // Could be used for user system later
  shareCode: text("share_code").notNull().unique(), // Unique code for sharing
  showPrice: boolean("show_price").default(true),
  showVendor: boolean("show_vendor").default(false),
  expiresAt: timestamp("expires_at"), // Optional expiry
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  emoji: text("emoji"), // For visual distinction
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
export const usersRelations = relations(users, ({ many }) => ({
  meetings: many(meetings),
  designs: many(designs),
  collections: many(collections),
  sharedDesigns: many(sharedDesigns),
}));

export const meetingsRelations = relations(meetings, ({ one, many }) => ({
  user: one(users, {
    fields: [meetings.userId],
    references: [users.id],
  }),
  designs: many(designs),
}));

export const designsRelations = relations(designs, ({ one, many }) => ({
  user: one(users, {
    fields: [designs.userId],
    references: [users.id],
  }),
  meeting: one(meetings, {
    fields: [designs.meetingId],
    references: [meetings.id],
  }),
  sharedDesigns: many(sharedDesigns),
}));

export const sharedDesignsRelations = relations(sharedDesigns, ({ one }) => ({
  design: one(designs, {
    fields: [sharedDesigns.designId],
    references: [designs.id],
  }),
  user: one(users, {
    fields: [sharedDesigns.userId],
    references: [users.id],
  }),
}));

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type Meeting = InferSelectModel<typeof meetings>;
export type NewMeeting = InferInsertModel<typeof meetings>;
export type Design = InferSelectModel<typeof designs>;
export type NewDesign = InferInsertModel<typeof designs>;
export type Collection = InferSelectModel<typeof collections>;
export type NewCollection = InferInsertModel<typeof collections>;
export type SharedDesign = InferSelectModel<typeof sharedDesigns>;
export type NewSharedDesign = InferInsertModel<typeof sharedDesigns>;

// Schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
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
