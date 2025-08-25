import type { FC, ReactNode } from "react"

/**
 * Страница ошибки
 * @namespace Pages.Error
 * @returns {ReactNode}
 */
export const Error: FC = (): ReactNode => {
  return (
    <div>
      <h1>404</h1>
      <p>Страница не найдена</p>
    </div>
  )
}
