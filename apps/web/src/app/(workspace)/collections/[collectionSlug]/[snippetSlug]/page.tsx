import { NoFilesAction } from "./_components/no-files-action"

interface SnippetSlugLayoutProps {
  params: {
    snippetSlug: string
  }
  children: React.ReactNode
}

const SnippetSlugPage = async ({
  params: { snippetSlug },
}: SnippetSlugLayoutProps) => {
  return <NoFilesAction snippetSlug={snippetSlug} />
}

export default SnippetSlugPage
