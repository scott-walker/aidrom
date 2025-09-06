import { LayoutProvider } from "./layout-provider"
import { QueryProvider } from "./query-provider"

/**
 * Провайдер приложения
 * @namespace App.Provider.AppProvider
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </QueryProvider>
  )
}
