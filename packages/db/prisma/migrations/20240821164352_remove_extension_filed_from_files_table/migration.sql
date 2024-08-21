/*
  Warnings:

  - You are about to drop the column `extension` on the `files` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "files" DROP COLUMN "extension";

-- DropEnum
DROP TYPE "FileExtension";
