ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "collections" DROP CONSTRAINT "collections_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "designs" DROP CONSTRAINT "designs_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "meetings" DROP CONSTRAINT "meetings_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "shared_designs" DROP CONSTRAINT "shared_designs_user_id_users_id_fk";
