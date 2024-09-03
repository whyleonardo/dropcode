"use server"

import { db } from "@dropcode/db"

interface checkFilesCountProps {
  snippetId: string
}

const MAX_FILES_PER_SNIPPET = 5
// TODO: Uncomment when we have pro features
// const MAX_FILES_PER_SNIPPET_WITH_PRO = 10

export const checkFilesCount = async ({ snippetId }: checkFilesCountProps) => {
  const fileCount = await db.file.count({
    where: {
      snippetId,
    },
  })

  if (fileCount >= MAX_FILES_PER_SNIPPET) {
    throw new Error("You can't have more than 5 files per snippet")
  }
}
