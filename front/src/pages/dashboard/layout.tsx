import type { ReactNode } from "react"
import { Heading } from "@ui/heading"

/**
 * Макет страницы
 * @namespace Pages.Dashboard.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Heading level={1}>Dashboard</Heading>
      {children}
    </>
  )
}
