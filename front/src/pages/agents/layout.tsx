import type { ReactNode } from "react"
import { useLayoutTitle } from "@lib/layout-api"
import { Container } from "@ui/container"

/**
 * Макет страницы агентов
 * @namespace Pages.Agents.Layout
 */
export const AgentsLayout = ({ children }: { children: ReactNode }) => {
  const { setTitle } = useLayoutTitle()

  setTitle("Агенты")

  return <Container>{children}</Container>
}
