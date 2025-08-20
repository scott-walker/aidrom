import type { FC, JSX } from "react"
import { Brand } from "../components/Brand"

/**
 * Главная страница
 * @namespace Pages.Dashboard
 * @returns {JSX.Element}
 */
export const Dashboard: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-5xl font-bold text-foreground font-display">Страница "Dashboard"</h1>
      <p className="text-2xl text-foreground font-sans">Прямо сейчас ты находишься на главной странице</p>
      <div className="flex flex-col gap-4 mt-10">
        <Brand size="sm" />
        <Brand size="md" />
        <Brand size="lg" />
      </div>
    </div>
  )
}
