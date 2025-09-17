import type { ReactNode } from "react"
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { RestError } from "@features/provider-form/model/api/rest-error"

/**
 * Провайдер запросов
 * @namespace App.Provider.QueryProvider
 */
export const QueryProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: error => {
        if ((error as RestError).status === 401) {
          // window.location.href = "/login"
          console.error("🔥 Unauthorized error:", error)
        }
        if ((error as RestError).status >= 500) {
          console.error("🔥 Internal server error:", error)
        }
      }
    }),
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        onError: error => {
          console.error("❌ Mutation failed:", error)
        }
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
