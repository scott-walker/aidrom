import { useState, useEffect } from "react"
import { getProviders } from "../api"
import { type ProviderSchema } from "@entities/provider/lib/types"

/**
 * Хук для получения списка провайдеров
 * @namespace Features.Provider.ProvidersDataTable.Model.useProviders
 */
export const useProviders = () => {
  const [providers, setProviders] = useState<ProviderSchema[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setIsLoading(true)
        setProviders(await getProviders())
      } catch (error) {
        setError(error as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProviders()
  }, [])

  return { providers, error, isLoading }
}
