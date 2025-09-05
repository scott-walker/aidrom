import { useState, useEffect } from "react"
import { getRequests } from "../api"
import { type RequestSchema } from "@entities/request/lib/types"

/**
 * Хук для получения списка запросов
 * @namespace Features.Request.RequestsDataTable.Model.useRequests
 */
export const useRequests = () => {
  const [requests, setRequests] = useState<RequestSchema[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true)
        setRequests(await getRequests())
      } catch (error) {
        setError(error as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequests()
  }, [])

  return { requests, error, isLoading }
}
