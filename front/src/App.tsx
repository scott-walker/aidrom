import type { FC, ReactNode } from "react"
import { Layout } from "@layouts"
import { Dashboard as DashboardPage } from "@pages/Dashboard"

/**
 * Главный компонент приложения
 * @namespace App
 * @returns {ReactNode}
 */
export const App: FC = (): ReactNode => {
  return (
    <Layout>
      <DashboardPage />
    </Layout>
  )
}

export default App
