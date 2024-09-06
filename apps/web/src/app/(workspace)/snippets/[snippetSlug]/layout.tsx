import {
  Drop,
  DropContent,
  DropHeader,
  DropSidebar,
  DropWrapper,
} from "@/components/drop"

import { QueryKeyFactory } from "@/lib/keys"
import { prefetchQuery } from "@/lib/tanstack-query/server-actions-prefetch"

import { fetchFilesBySnippetSlug } from "@/data/fetch-files-by-snippet-slug"
import { getSnippetBySlug } from "@/data/get-snippet-by-slug"

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import { DropMenuCommand } from "./_components/drop-menu-command"
import { SidebarContent } from "./_components/sidebar-content"

interface SnippetSlugLayoutProps {
  params: {
    snippetSlug: string
  }
  children: React.ReactNode
}

const SnippetSlugLayout = async ({
  children,
  params: { snippetSlug },
}: SnippetSlugLayoutProps) => {
  const queryClient = new QueryClient()
  await prefetchQuery(
    getSnippetBySlug,
    {
      input: { snippetSlug },
      queryKey: QueryKeyFactory.fetchSnippets(),
    },
    queryClient
  )

  await prefetchQuery(
    fetchFilesBySnippetSlug,
    {
      input: { snippetSlug },
      queryKey: QueryKeyFactory.fetchFilesBySnippetSlug({ snippetSlug }),
    },
    queryClient
  )

  return (
    <div className="relative mt-10 h-full max-h-[calc(100dvh-5.5rem)] md:mt-0">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Drop>
          <DropHeader className="hidden">Header</DropHeader>

          <DropWrapper>
            <DropSidebar>
              <SidebarContent snippetSlug={snippetSlug} />
            </DropSidebar>

            <DropContent>{children}</DropContent>
          </DropWrapper>
        </Drop>

        <div className="absolute bottom-4 right-4 md:hidden">
          <DropMenuCommand snippetSlug={snippetSlug} />
        </div>
      </HydrationBoundary>
    </div>
  )
}

export default SnippetSlugLayout
