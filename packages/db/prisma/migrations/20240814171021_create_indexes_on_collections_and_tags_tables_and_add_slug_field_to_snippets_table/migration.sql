/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `collections` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `collections` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `snippets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `snippets` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "collections_user_id_slug_key";

-- AlterTable
ALTER TABLE "snippets" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "collections_slug_key" ON "collections"("slug");

-- CreateIndex
CREATE INDEX "collections_user_id_idx" ON "collections"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "collections_user_id_key" ON "collections"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "snippets_slug_key" ON "snippets"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tags_user_id_key" ON "tags"("user_id");
