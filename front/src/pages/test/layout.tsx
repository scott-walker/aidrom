import type { ReactNode } from "react"
import { useTitle } from "@lib/layout-api/utils"

/**
 * Макет страницы
 * @namespace Pages.Test.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  useTitle("Разработка")

  return <>{children}</>
}
