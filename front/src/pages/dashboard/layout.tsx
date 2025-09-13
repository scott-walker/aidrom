import type { ReactNode } from "react"
import { useTitle } from "@lib/layout-api"
import { Container } from "@ui/container"

/**
 * Макет страницы
 * @namespace Pages.Dashboard.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  useTitle("Dashboard")

  return <Container>{children}</Container>
}
