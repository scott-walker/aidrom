import type { ReactNode } from "react"
import { useTitle } from "@lib/layout-api"
import { Container } from "@ui/container"

/**
 * Макет страницы агентов
 * @namespace Pages.Agents.Layout
 */
export const AgentsLayout = ({ children }: { children: ReactNode }) => {
  useTitle("Агенты")

  return <Container>{children}</Container>
}
