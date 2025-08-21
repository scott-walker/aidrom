import type { FC, ReactNode } from "react"
import { Lucent as LucentLayout } from "@layouts/Lucent"
import { Dashboard as DashboardPage } from "@pages/Dashboard"

/**
 * Главный компонент приложения
 * @namespace App
 * @returns {ReactNode}
 */
export const App: FC = (): ReactNode => {
  return (
    <LucentLayout>
      <DashboardPage />
    </LucentLayout>
  )
}

export default App
