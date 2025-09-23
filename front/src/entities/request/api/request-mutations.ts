import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query"
import type { DeleteRequestsResponse } from "../lib/schema"
import type { RequestsFilterData } from "../lib/dto"
import { clearBrokenRequests, deleteRequests } from "./request-api"
import { queryKeys } from "./request-queries"

/**
 * Хук для удаления запросов
 * @namespace Entities.Request.Api.useDeleteRequests
 */
export const useDeleteRequests = (): UseMutationResult<DeleteRequestsResponse, Error, RequestsFilterData> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RequestsFilterData) => deleteRequests(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    }
  })
}

/**
 * Хук для очистки битых запросов
 * @namespace Entities.Request.Api.useClearBrokenRequests
 */
export const useClearBrokenRequests = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clearBrokenRequests,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    }
  })
}
