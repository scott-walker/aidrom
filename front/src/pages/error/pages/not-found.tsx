import type { ReactNode } from "react"

/**
 * Страница 404
 * @namespace Pages.Error.NotFound
 */
export const NotFound = (): ReactNode => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-danger p-20">
      <h1 className="text-9xl font-family-display font-mega-bold">404</h1>
    </div>
  )
}
