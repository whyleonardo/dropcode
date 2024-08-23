-- DropIndex
DROP INDEX "tags_user_id_idx";

-- CreateIndex
CREATE INDEX "files_user_id_snippet_id_idx" ON "files"("user_id", "snippet_id");

-- CreateIndex
CREATE INDEX "tags_user_id_slug_idx" ON "tags"("user_id", "slug");
