import { notFound } from "next/navigation"

import { Drop, DropContent, DropSidebar } from "@/components/drop"

import { QueryKeyFactory } from "@/lib/keys"
import { prefetchQuery } from "@/lib/tanstack-query/server-actions-prefetch"

import { fetchFilesBySnippetSlug } from "@/actions/fetch-files-by-snippet-slug"
import { getSnippetBySlug } from "@/actions/get-snippet-by-slug"

import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

import { DropMenuCommand } from "./_components/drop-menu-command"
import { SidebarContent } from "./_components/sidebar-content"

interface SnippetSlugLayoutProps {
  params: {
    snippetSlug: string
    collectionSlug: string
  }
  children: React.ReactNode
}

export const generateMetadata = ({
  params,
}: {
  params: { snippetSlug: string }
}) => {
  return {
    title: `Snippet - ${params.snippetSlug}`,
    template: `Snippet - ${params.snippetSlug} - %s`,
  }
}

const SnippetSlugLayout = async ({
  children,
  params: { snippetSlug, collectionSlug },
}: SnippetSlugLayoutProps) => {
  const [snippet] = await getSnippetBySlug({ snippetSlug })

  if (!snippet) {
    notFound()
  }

  const queryClient = await prefetchQuery(fetchFilesBySnippetSlug, {
    input: {
      snippetSlug,
    },
    queryKey: QueryKeyFactory.fetchFilesBySnippetSlug({ snippetSlug }),
  })

  return (
    <div className="relative mt-10 h-full max-h-[calc(100dvh-5.5rem)] md:mt-0">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Drop>
          <DropSidebar>
            <SidebarContent
              snippetSlug={snippetSlug}
              collectionSlug={collectionSlug}
            />
          </DropSidebar>

          <DropContent className="bg-background">{children}</DropContent>
        </Drop>

        <div className="absolute bottom-4 right-4 md:hidden">
          <DropMenuCommand
            snippetSlug={snippetSlug}
            collectionSlug={collectionSlug}
          />
        </div>
      </HydrationBoundary>
    </div>
  )
}

export default SnippetSlugLayout
