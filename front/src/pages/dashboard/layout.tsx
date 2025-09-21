import type { ReactNode } from "react"
import { useLayoutTitle } from "@lib/layout-api"
import { Container } from "@ui/container"

/**
 * Макет страницы
 * @namespace Pages.Dashboard.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  useLayoutTitle("Dashboard")

  return <Container>{children}</Container>
}
