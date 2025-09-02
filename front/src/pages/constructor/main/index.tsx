import type { ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"
import { CreateProviderForm } from "@features/provider/create-provider-form/ui/form"

/**
 * Конфигурация страницы
 * @namespace Pages.Constructor.ConstructorMain.PageConfig
 */
const config: PageConfig = {
  meta: {
    title: "Конструктор"
  }
}

/**
 * Главная страница конструктора
 * @namespace Pages.Constructor.ConstructorMain
 * @returns {ReactNode}
 */
export const ConstructorMain = createPage(config, (): ReactNode => {
  return (
    <div className="flex items-start justify-start gap-8">
      <CreateProviderForm onSubmit={() => {}} />
      <CreateProviderForm onSubmit={() => {}} />
    </div>
  )
})
