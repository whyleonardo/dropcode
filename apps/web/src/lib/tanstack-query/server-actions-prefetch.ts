import type { QueryClient, useQuery } from "@tanstack/react-query"

import type {
  TAnyZodSafeFunctionHandler,
  inferServerActionError,
  inferServerActionInput,
  inferServerActionReturnData,
} from "zsa"

import { getQueryClient } from "./get-query-client"

export const prefetchQuery = async <
  THandler extends TAnyZodSafeFunctionHandler,
  TInitialData extends
    | undefined
    | inferServerActionReturnData<THandler>
    | (() => inferServerActionReturnData<THandler>),
>(
  action: THandler,
  options: Omit<
    Parameters<
      typeof useQuery<
        inferServerActionReturnData<THandler>,
        inferServerActionError<THandler>,
        inferServerActionReturnData<THandler>
      >
    >[0],
    "queryFn" | "initialData"
  > & {
    input: inferServerActionInput<THandler>
    initialData?: TInitialData
  },
  passQueryClient?: QueryClient
): Promise<InstanceType<typeof QueryClient>> => {
  const queryClient = passQueryClient ?? getQueryClient()
  await queryClient.prefetchQuery<
    inferServerActionReturnData<THandler>,
    inferServerActionError<THandler>,
    inferServerActionReturnData<THandler>
  >({
    ...options,
    queryFn: async () => {
      const result = await action(options.input)

      if (!result) return

      const [data, err] = result

      if (err) {
        throw err
      }

      return data
    },
  })

  return queryClient
}
