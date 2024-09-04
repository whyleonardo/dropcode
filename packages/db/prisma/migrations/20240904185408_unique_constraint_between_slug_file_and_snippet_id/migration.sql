/*
  Warnings:

  - A unique constraint covering the columns `[slug,snippet_id]` on the table `files` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "files_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "files_slug_snippet_id_key" ON "files"("slug", "snippet_id");
