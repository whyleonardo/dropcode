/*
  Warnings:

  - A unique constraint covering the columns `[slug,snippet_id]` on the table `tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_snippet_id_key" ON "tags"("slug", "snippet_id");
