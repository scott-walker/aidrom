import type { ReactNode } from "react"
import type { RouteObject } from "react-router"

/**
 * Тип метаданных страницы
 * @namespace Shared.Lib.PageApi.PageMeta
 */
export type PageMeta = {
  title?: string
}

/**
 * Тип слоты страницы
 * @namespace Shared.Lib.PageApi.PageSlots
 */
export type PageSlots = {
  header?: ReactNode
  sidebar?: ReactNode
  infobar?: ReactNode
  footer?: ReactNode
}

/**
 * Тип данные страницы
 * @namespace Shared.Lib.PageApi.PageConfig
 */
export type PageConfig = {
  meta?: PageMeta
  slots?: PageSlots
}

/**
 * Тип нормализованной конфигурации страницы
 * @namespace Shared.Lib.PageApi.NormalizedPageConfig
 */
export type NormalizedPageConfig = {
  meta: PageMeta
  slots: PageSlots
}

/**
 * Тип API страницы
 * @namespace Shared.Lib.PageApi.PageContextApi
 */
export type PageContextApi = {
  setConfig: (config: PageConfig) => void
  unsetConfig: () => void
  setTitle: (title: string) => void
  getTitle: () => string
  setSlot: (slot: keyof PageSlots, node: ReactNode) => void
  getSlot: (slot: keyof PageSlots) => ReactNode
}

/**
 * Тип пропсов провайдера
 * @namespace Shared.Lib.PageApi.PageProviderProps
 */
export type PageProviderProps = {
  children: ReactNode
  config: PageConfig
}

/**
 * Тип конфигурации макета страницы
 * @namespace Shared.Lib.PageApi.PageLayoutConfig
 */
export type PageLayoutConfig = PageConfig

/**
 * Тип пропсов макета страницы
 * @namespace Shared.Lib.PageApi.PageLayoutProps
 */
export type PageLayoutProps = {
  children: ReactNode
}

/**
 * Тип маршрута страницы
 * @namespace Shared.Lib.PageApi.PageRoutes
 */
export type PageRoutes = RouteObject

/**
 * Тип страницы
 * @namespace Shared.Lib.PageApi.Page
 */
export type Page = {
  routes: PageRoutes
}

/**
 * Тип реестр страниц
 * @namespace Shared.Lib.PageApi.PageRegistry
 */
export type PageRegistry = {
  getPages: () => Page[]
  getRoutes: () => PageRoutes[]
}
