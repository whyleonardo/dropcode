import { auth } from "@soli/auth"
import { db } from "@soli/db"

interface SnippetSlugPageProps {
  params: {
    snippetSlug: string
  }
}

const SnippetSlugPage = async ({
  params: { snippetSlug },
}: SnippetSlugPageProps) => {
  const userSession = await auth()

  const userId = userSession?.user?.id

  const snippet = await db.snippet.findUnique({
    where: {
      userId,
      slug: snippetSlug,
    },
    include: {
      files: true,
    },
  })

  return <div>{snippet?.files.map((file) => file.content)}</div>
}

export default SnippetSlugPage
