/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `files` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "files_slug_key" ON "files"("slug");
