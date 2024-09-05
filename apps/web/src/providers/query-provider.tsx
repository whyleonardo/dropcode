"use client"

import { getQueryClient } from "@/lib/tanstack-query/get-query-client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}
