import { createContext, useContext } from "react"
import type { PageContextApi } from "./types"

/**
 * Контекст страницы
 * @namespace Shared.Lib.PageApi.PageContext
 */
export const PageContext = createContext<PageContextApi>({} as PageContextApi)

/**
 * Хук для получения API страницы
 * @namespace Shared.Lib.PageApi.usePage
 */
export const usePage = (): PageContextApi => {
  const api = useContext(PageContext)

  if (!api) {
    throw new Error("Используй createPage() для создания страницы, чтобы использовать usePage")
  }

  return api
}
