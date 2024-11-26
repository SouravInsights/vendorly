CREATE TABLE IF NOT EXISTS "designs" (
	"id" serial PRIMARY KEY NOT NULL,
	"meeting_id" integer,
	"image_url" text NOT NULL,
	"price" integer NOT NULL,
	"notes" text,
	"category" text,
	"min_order_quantity" integer,
	"sizes" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_shortlisted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meetings" (
	"id" serial PRIMARY KEY NOT NULL,
	"vendor_name" text NOT NULL,
	"location" text NOT NULL,
	"phone_number" text,
	"meeting_date" timestamp DEFAULT now() NOT NULL,
	"notes" text,
	"follow_up_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "designs" ADD CONSTRAINT "designs_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
