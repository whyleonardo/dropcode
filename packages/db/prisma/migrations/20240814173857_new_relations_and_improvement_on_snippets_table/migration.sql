/*
  Warnings:

  - You are about to drop the column `tags` on the `snippets` table. All the data in the column will be lost.
  - Added the required column `snippet_id` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "snippets" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "snippet_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "tags_user_id_idx" ON "tags"("user_id");

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_snippet_id_fkey" FOREIGN KEY ("snippet_id") REFERENCES "snippets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
