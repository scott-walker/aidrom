import { createElement, useEffect, type ComponentType, type FC, type ReactNode } from "react"
import merge from "lodash.merge"
import type { RouteObject } from "react-router"
import type {
  Page,
  PageConfig,
  PageLayoutConfig,
  PageLayoutProps,
  PageRegistry,
  NormalizedPageConfig,
  PageMeta,
  NormalizedPageMeta,
  PageSlots,
  NormalizedPageSlots
} from "./types"
import { usePage } from "./context"
import { PageProvider } from "./provider"

/**
 * Создать макет
 * @namespace Shared.Lib.LayoutApi.createLayout
 */
export const createLayout = (config: PageLayoutConfig, Component: FC<PageLayoutProps>): FC<PageLayoutProps> => {
  // Обернуть компонент в провайдер макета
  return function Layout({ children }: PageLayoutProps) {
    console.log("createLayout:mount")

    return createElement(PageProvider, {
      children: createElement(Component, { children }),
      config
    })
  }
}

/**
 * Создать страницу
 * @namespace Shared.Lib.PageApi.createPage
 */
export const createPage = (config: PageConfig, Component: ComponentType): FC => {
  // Вернуть компонент страницы с настроенным контекстом
  return function Page(): ReactNode {
    console.log("createPage:mount", config.meta?.title)

    const { setConfig, unsetConfig } = usePage()

    // Установить конфигурацию страницы
    useEffect(() => {
      console.log("createPage:effect", config)
      setConfig(config)
      // console.log("createPage:effect")

      return () => {
        unsetConfig()
      }
    }, [])

    return createElement(Component)
  }
}

/**
 * Зарегистрировать страницы
 * @namespace Shared.Lib.PageApi.registerPages
 * @param {Page[]} pages Коллекция страниц
 * @returns {RouteObject[]} Массив маршрутов
 */
export const registerPages = (pages: Page[]): PageRegistry => {
  /**
   * Получить страницы
   * @returns {Page[]} Массив страниц
   */
  const getPages = (): Page[] => pages

  /**
   * Получить маршруты страниц
   * @returns {RouteObject[]} Массив маршрутов
   */
  const getRoutes = (): RouteObject[] => getPages().map(page => ({ ...page.routes }))

  return {
    getPages,
    getRoutes
  }
}

/**
 * Нормализовать метаданные страницы
 * @namespace Shared.Lib.PageApi.normalizeMeta
 * @param {PageMeta} meta Метаданные страницы
 * @returns {NormalizedPageMeta} Нормализованные метаданные страницы
 */
export const normalizeMeta = (meta: PageMeta): NormalizedPageMeta => {
  return {
    title: meta.title ?? "",
    subtitle: meta.subtitle ?? "",
    description: meta.description ?? ""
  }
}

/**
 * Нормализовать слоты страницы
 * @namespace Shared.Lib.PageApi.normalizeSlots
 * @param {PageSlots} slots Слоты страницы
 * @returns {NormalizedPageSlots} Нормализованные слоты страницы
 */
export const normalizeSlots = (slots: PageSlots): NormalizedPageSlots => {
  slots = slots ?? {}

  return {
    header: slots.header ?? null,
    sidebar: slots.sidebar ?? null,
    infobar: slots.infobar ?? null,
    footer: slots.footer ?? null
  }
}

/**
 * Нормализовать конфигурацию страницы
 * @namespace Shared.Lib.PageApi.normalizeConfig
 * @param {PageConfig} config Конфигурация страницы
 * @returns {NormalizedPageConfig} Нормализованная конфигурация страницы
 */
export const normalizeConfig = (config: PageConfig): NormalizedPageConfig => {
  config = config ?? {}

  const meta = normalizeMeta(config.meta ?? {})
  const slots = normalizeSlots(config.slots ?? {})

  return { meta, slots }
}

/**
 * Объединить конфигурации
 * @namespace Shared.Lib.PageApi.mergeConfig
 * @param {PageConfig} prevConfig Предыдущая конфигурация
 * @param {PageConfig} newConfig Новая конфигурация
 * @returns {PageConfig} Объединенная конфигурация
 */
export const mergeConfig = (...configs: PageConfig[]): PageConfig => {
  return merge({}, ...configs) as PageConfig
}
