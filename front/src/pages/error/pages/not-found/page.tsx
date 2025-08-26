import type { ReactNode } from "react"
import { Link } from "react-router"
import { createPage, type PageConfig } from "@lib/page-api"

/**
 * Конфигурация страницы
 */
const config: PageConfig = {
  meta: {
    title: "404"
  }
  // slots: {
  //   // header: <h2>Dashboard Header</h2>
  //   // sidebar: <h2>Dashboard Sidebar</h2>,
  //   // infobar: <h2>Dashboard Infobar</h2>,
  //   // footer: <h2>Dashboard Footer</h2>
  // }
}

/**
 * Страница 404
 */
export const NotFound = createPage(config, (): ReactNode => {
  return (
    <div className="flex flex-col items-center justify-center bg-amber-600 text-white p-20">
      <h1 className="text-7xl font-family-display">404</h1>
      <Link to="/">Главная</Link>
    </div>
  )
})
