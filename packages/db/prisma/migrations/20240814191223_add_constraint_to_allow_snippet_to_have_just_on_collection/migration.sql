/*
  Warnings:

  - A unique constraint covering the columns `[collection_id]` on the table `snippets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "snippets_collection_id_key" ON "snippets"("collection_id");
