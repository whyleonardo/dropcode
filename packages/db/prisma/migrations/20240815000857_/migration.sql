/*
  Warnings:

  - You are about to drop the `tagsonsnippet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tagsonsnippet" DROP CONSTRAINT "tagsonsnippet_snippet_id_fkey";

-- DropForeignKey
ALTER TABLE "tagsonsnippet" DROP CONSTRAINT "tagsonsnippet_tag_id_fkey";

-- DropTable
DROP TABLE "tagsonsnippet";

-- CreateTable
CREATE TABLE "_SnippetToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SnippetToTag_AB_unique" ON "_SnippetToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_SnippetToTag_B_index" ON "_SnippetToTag"("B");

-- AddForeignKey
ALTER TABLE "_SnippetToTag" ADD CONSTRAINT "_SnippetToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "snippets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SnippetToTag" ADD CONSTRAINT "_SnippetToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
