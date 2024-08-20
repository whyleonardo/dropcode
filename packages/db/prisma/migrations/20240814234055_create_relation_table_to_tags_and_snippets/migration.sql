/*
  Warnings:

  - You are about to drop the column `snippet_id` on the `tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_snippet_id_fkey";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "snippet_id";

-- CreateTable
CREATE TABLE "tagsonsnippet" (
    "snippet_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "tagsonsnippet_pkey" PRIMARY KEY ("snippet_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "tagsonsnippet" ADD CONSTRAINT "tagsonsnippet_snippet_id_fkey" FOREIGN KEY ("snippet_id") REFERENCES "snippets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagsonsnippet" ADD CONSTRAINT "tagsonsnippet_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
