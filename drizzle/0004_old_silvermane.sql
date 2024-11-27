CREATE TABLE IF NOT EXISTS "shared_designs" (
	"id" serial PRIMARY KEY NOT NULL,
	"design_id" integer NOT NULL,
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
DO $$ BEGIN
 ALTER TABLE "shared_designs" ADD CONSTRAINT "shared_designs_design_id_designs_id_fk" FOREIGN KEY ("design_id") REFERENCES "public"."designs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
