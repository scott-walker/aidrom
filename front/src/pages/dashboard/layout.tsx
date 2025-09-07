import type { ReactNode } from "react"
import { Heading } from "@ui/heading"
import { Container } from "@ui/container"

/**
 * Макет страницы
 * @namespace Pages.Dashboard.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Heading level={1}>Dashboard</Heading>
      {children}
    </Container>
  )
}
