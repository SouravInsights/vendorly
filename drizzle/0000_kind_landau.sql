CREATE TABLE IF NOT EXISTS "collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"emoji" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "designs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"meeting_id" integer,
	"image_url" text NOT NULL,
	"base_price" integer DEFAULT 0 NOT NULL,
	"final_price" integer DEFAULT 0 NOT NULL,
	"similar_designs_min_price" integer,
	"similar_designs_max_price" integer,
	"notes" text,
	"category" text,
	"min_order_quantity" integer,
	"sizes" jsonb DEFAULT '["S","M","L","XL"]'::jsonb,
	"is_shortlisted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"source" text DEFAULT 'direct' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "designs_to_collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"design_id" integer NOT NULL,
	"collection_id" integer NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meetings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"vendor_name" text NOT NULL,
	"location" text NOT NULL,
	"phone_number" text,
	"meeting_date" timestamp DEFAULT now() NOT NULL,
	"notes" text,
	"follow_up_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shared_designs" (
	"id" serial PRIMARY KEY NOT NULL,
	"design_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"shared_by" text NOT NULL,
	"share_code" text NOT NULL,
	"show_price" boolean DEFAULT true,
	"show_vendor" boolean DEFAULT false,
	"expires_at" timestamp,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "shared_designs_share_code_unique" UNIQUE("share_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collections" ADD CONSTRAINT "collections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "designs" ADD CONSTRAINT "designs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "designs" ADD CONSTRAINT "designs_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "designs_to_collections" ADD CONSTRAINT "designs_to_collections_design_id_designs_id_fk" FOREIGN KEY ("design_id") REFERENCES "public"."designs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "designs_to_collections" ADD CONSTRAINT "designs_to_collections_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meetings" ADD CONSTRAINT "meetings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shared_designs" ADD CONSTRAINT "shared_designs_design_id_designs_id_fk" FOREIGN KEY ("design_id") REFERENCES "public"."designs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shared_designs" ADD CONSTRAINT "shared_designs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
