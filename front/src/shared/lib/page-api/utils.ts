import { createElement, useLayoutEffect, type ComponentType, type FC, type ReactNode } from "react"
import type { RouteObject } from "react-router"
import type { Page, PageConfig, PageLayoutConfig, PageLayoutProps, PageRegistry, NormalizedPageConfig } from "./types"
import { usePage } from "./context"
import { PageProvider } from "./provider"

/**
 * Создать страницу
 * @namespace Shared.Lib.PageApi.createPage
 */
export const createPage = (config: PageConfig, Component: ComponentType): FC => {
  // Вернуть компонент страницы с настроенным контекстом
  return function Page(): ReactNode {
    const { setConfig, unsetConfig } = usePage()

    // Установить конфигурацию страницы
    useLayoutEffect(() => {
      setConfig(config)

      return () => unsetConfig()
    }, [setConfig, unsetConfig])

    return createElement(Component)
  }
}

/**
 * Создать макет
 * @namespace Shared.Lib.LayoutApi.createLayout
 */
export const createLayout = (config: PageLayoutConfig, Component: FC<PageLayoutProps>): FC<PageLayoutProps> => {
  // Обернуть компонент в провайдер макета
  return function Layout({ children }: PageLayoutProps) {
    return createElement(PageProvider, {
      children: createElement(Component, { children }),
      config
    })
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
 * Нормализовать конфигурацию страницы
 * @namespace Shared.Lib.PageApi.normalizeConfig
 * @param {PageConfig} config Конфигурация страницы
 * @returns {NormalizedPageConfig} Нормализованная конфигурация страницы
 */
export const normalizeConfig = (config: PageConfig): NormalizedPageConfig => {
  config = config ?? {}

  const meta = config.meta ?? {}
  const slots = config.slots ?? {}

  return {
    meta: {
      title: meta.title ?? ""
    },
    slots: {
      header: slots.header ?? null,
      sidebar: slots.sidebar ?? null,
      infobar: slots.infobar ?? null,
      footer: slots.footer ?? null
    }
  }
}
