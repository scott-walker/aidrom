import type { ReactNode } from "react"
import type { RouteObject } from "react-router"

/**
 * Метаданные страницы
 * @namespace Shared.Lib.PageApi.PageMeta
 */
export type PageMeta = {
  title?: string
  subtitle?: string
  description?: string
}

/**
 * Нормализованные метаданные страницы
 * @namespace Shared.Lib.PageApi.NormalizedPageMeta
 */
export type NormalizedPageMeta = {
  title: string
  subtitle: string
  description: string
}

/**
 * Слот страницы
 * @namespace Shared.Lib.PageApi.PageSlot
 */
export type PageSlot = ReactNode | null

/**
 * Слоты страницы
 * @namespace Shared.Lib.PageApi.PageSlots
 */
export type PageSlots = {
  header?: PageSlot
  sidebar?: PageSlot
  infobar?: PageSlot
  footer?: PageSlot
}

/**
 * Нормализованные слоты страницы
 * @namespace Shared.Lib.PageApi.NormalizedPageSlots
 */
export type NormalizedPageSlots = {
  header: PageSlot
  sidebar: PageSlot
  infobar: PageSlot
  footer: PageSlot
}

/**
 * Конфигурация страницы
 * @namespace Shared.Lib.PageApi.PageConfig
 */
export type PageConfig = {
  meta?: PageMeta
  slots?: PageSlots
}

/**
 * Нормализованная конфигурация страницы
 * @namespace Shared.Lib.PageApi.NormalizedPageConfig
 */
export type NormalizedPageConfig = {
  meta: PageMeta
  slots: PageSlots
}

/**
 * API страницы
 * @namespace Shared.Lib.PageApi.PageContextApi
 */
export type PageContextApi = {
  setConfig: (config: PageConfig) => void
  unsetConfig: () => void
  getConfig: () => PageConfig
  setTitle: (title: string) => void
  setSubtitle: (subtitle: string) => void
  setDescription: (description: string) => void
  setSlot: (slot: keyof PageSlots, node: PageSlot) => void
  getTitle: () => string
  getSubtitle: () => string
  getDescription: () => string
  getSlot: (slot: keyof PageSlots) => PageSlot
}

/**
 * Пропсы провайдера
 * @namespace Shared.Lib.PageApi.PageProviderProps
 */
export type PageProviderProps = {
  children: ReactNode
  config: PageConfig
}

/**
 * Конфигурация макета страницы
 * @namespace Shared.Lib.PageApi.PageLayoutConfig
 */
export type PageLayoutConfig = PageConfig

/**
 * Пропсы макета страницы
 * @namespace Shared.Lib.PageApi.PageLayoutProps
 */
export type PageLayoutProps = {
  children?: ReactNode
}

/**
 * Маршруты страницы
 * @namespace Shared.Lib.PageApi.PageRoutes
 */
export type PageRoutes = RouteObject

/**
 * Страница
 * @namespace Shared.Lib.PageApi.Page
 */
export type Page = {
  routes: PageRoutes
}

/**
 * Реестр страниц
 * @namespace Shared.Lib.PageApi.PageRegistry
 */
export type PageRegistry = {
  getPages: () => Page[]
  getRoutes: () => PageRoutes[]
}
