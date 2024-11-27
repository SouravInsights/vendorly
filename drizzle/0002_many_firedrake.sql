ALTER TABLE "designs" RENAME COLUMN "price" TO "base_price";--> statement-breakpoint
ALTER TABLE "designs" ADD COLUMN "final_price" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "designs" ADD COLUMN "similar_designs_min_price" numeric;--> statement-breakpoint
ALTER TABLE "designs" ADD COLUMN "similar_designs_max_price" numeric;