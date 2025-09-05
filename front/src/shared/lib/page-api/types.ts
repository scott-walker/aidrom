import type { RouteObject } from "react-router"

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
