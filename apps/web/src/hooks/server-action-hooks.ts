import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"

import {
  createServerActionsKeyFactory,
  setupServerActionHooks,
} from "zsa-react-query"

export const QueryKeyFactory = createServerActionsKeyFactory({
  fetchLinesCreatedInPeriod: () => ["lines-created-in-period"],
})

const {
  useServerActionQuery,
  useServerActionMutation,
  useServerActionInfiniteQuery,
} = setupServerActionHooks({
  hooks: {
    useQuery: useQuery,
    useMutation: useMutation,
    useInfiniteQuery: useInfiniteQuery,
  },
  queryKeyFactory: QueryKeyFactory,
})

export {
  useServerActionInfiniteQuery,
  useServerActionMutation,
  useServerActionQuery,
}
