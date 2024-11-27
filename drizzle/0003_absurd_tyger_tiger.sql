ALTER TABLE "designs" ALTER COLUMN "base_price" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "designs" ALTER COLUMN "base_price" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "designs" ALTER COLUMN "final_price" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "designs" ALTER COLUMN "final_price" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "designs" ALTER COLUMN "similar_designs_min_price" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "designs" ALTER COLUMN "similar_designs_max_price" SET DATA TYPE integer;