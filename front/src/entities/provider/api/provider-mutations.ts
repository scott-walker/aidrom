import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query"
import { queryKeys } from "./provider-queries"
import { createProvider, updateProvider } from "./provider-api"
import type { ProviderCreateData, ProviderUpdateData } from "../lib/types"
import type { Provider } from "../lib/schema"

/**
 * Хук для создания провайдера
 * @namespace Entities.Provider.Api.useCreateProvider
 */
export const useCreateProvider = (): UseMutationResult<Provider, Error, ProviderCreateData> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProviderCreateData) => createProvider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list({}) })
    }
  })
}

/**
 * Хук для обновления провайдера
 * @namespace Entities.Provider.Api.useUpdateProvider
 */
export const useUpdateProvider = (): UseMutationResult<
  Provider,
  Error,
  { providerId: number; data: ProviderUpdateData }
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ providerId, data }: { providerId: number; data: ProviderUpdateData }) => {
      return updateProvider(providerId, data)
    },
    onSuccess: (provider: Provider) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.details(provider.id) })
    }
  })
}
