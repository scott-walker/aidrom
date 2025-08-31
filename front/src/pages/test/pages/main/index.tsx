import type { ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"
import { Tooltip } from "@shared/ui/tooltip"
import { Button } from "@shared/ui/button"

/**
 * Конфигурация страницы
 */
const config: PageConfig = {
  meta: {
    title: "Main"
  }
}

/**
 * Главная страница тестирования
 */
export const MainPage = createPage(config, (): ReactNode => {
  return (
    <div className="flex flex-col">
      <p className="text-2xl text-foreground font-family-base">
        Прямо сейчас ты находишься на главной странице тестирования компонентов
      </p>
      <div className="mt-10">
        <Tooltip target={<Button variant="secondary">Наведи же!</Button>}>Ну вот и вы тут</Tooltip>
      </div>
    </div>
  )
})
