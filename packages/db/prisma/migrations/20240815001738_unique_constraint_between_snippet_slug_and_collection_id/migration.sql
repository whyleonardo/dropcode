/*
  Warnings:

  - A unique constraint covering the columns `[collection_id,slug]` on the table `snippets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "snippets_collection_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "snippets_collection_id_slug_key" ON "snippets"("collection_id", "slug");
