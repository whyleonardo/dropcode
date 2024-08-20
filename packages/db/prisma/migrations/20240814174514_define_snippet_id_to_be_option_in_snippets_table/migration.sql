-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_snippet_id_fkey";

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "snippet_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_snippet_id_fkey" FOREIGN KEY ("snippet_id") REFERENCES "snippets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
