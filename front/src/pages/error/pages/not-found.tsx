import type { ReactNode } from "react"
import { Link } from "react-router"

/**
 * Страница 404
 * @namespace Pages.Error.NotFound
 */
export const NotFound = (): ReactNode => {
  return (
    <div className="flex flex-col items-center justify-center bg-danger text-white p-20">
      <h1 className="text-9xl font-family-display">404</h1>
      <Link to="/">Главная</Link>
    </div>
  )
}
