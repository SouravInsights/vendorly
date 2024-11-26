ALTER TABLE "designs" ALTER COLUMN "meeting_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "designs" ALTER COLUMN "sizes" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "designs" ALTER COLUMN "sizes" SET DEFAULT '["S","M","L","XL"]'::jsonb;