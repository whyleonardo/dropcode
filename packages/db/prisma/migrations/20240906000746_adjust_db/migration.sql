/*
  Warnings:

  - You are about to drop the column `slug` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `collection_id` on the `snippets` table. All the data in the column will be lost.
  - You are about to drop the `_SnippetToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `collections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[public_id]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,language,snippet_id]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `snippets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,user_id]` on the table `snippets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `public_id` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `snippets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SnippetToTag" DROP CONSTRAINT "_SnippetToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_SnippetToTag" DROP CONSTRAINT "_SnippetToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_user_id_fkey";

-- DropForeignKey
ALTER TABLE "snippets" DROP CONSTRAINT "snippets_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_user_id_fkey";

-- DropIndex
DROP INDEX "files_slug_snippet_id_key";

-- DropIndex
DROP INDEX "snippets_collection_id_slug_key";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "slug",
ADD COLUMN     "public_id" VARCHAR(21) NOT NULL;

-- AlterTable
ALTER TABLE "snippets" DROP COLUMN "collection_id",
ADD COLUMN     "public_id" VARCHAR(21) NOT NULL;

-- DropTable
DROP TABLE "_SnippetToTag";

-- DropTable
DROP TABLE "collections";

-- DropTable
DROP TABLE "tags";

-- CreateIndex
CREATE UNIQUE INDEX "files_public_id_key" ON "files"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "files_name_language_snippet_id_key" ON "files"("name", "language", "snippet_id");

-- CreateIndex
CREATE UNIQUE INDEX "snippets_public_id_key" ON "snippets"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "snippets_slug_user_id_key" ON "snippets"("slug", "user_id");
