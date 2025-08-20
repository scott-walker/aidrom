import type { FC, JSX } from "react"
import { Lucent as LucentLayout } from "@layouts/Lucent"
import { Dashboard as DashboardPage } from "@pages/Dashboard"

/**
 * Главный компонент приложения
 * @namespace App
 * @returns {JSX.Element}
 */
export const App: FC = (): JSX.Element => {
  const header = <h1>Header</h1>
  const sidebar = <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</div>
  const content = <DashboardPage />
  const infobar = <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</div>
  const footer = <div>Dolor sit amet quos.</div>

  return <LucentLayout content={content} header={header} sidebar={sidebar} infobar={infobar} footer={footer} />
}

export default App
