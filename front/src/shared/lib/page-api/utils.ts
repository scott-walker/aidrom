import type { RouteObject } from "react-router"
import type { Page, PageRegistry } from "./types"

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
