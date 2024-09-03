-- DropForeignKey
ALTER TABLE "snippets" DROP CONSTRAINT "snippets_user_id_fkey";

-- AddForeignKey
ALTER TABLE "snippets" ADD CONSTRAINT "snippets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
