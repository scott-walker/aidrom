import type { ReactNode } from "react"
import { useLayoutTitle } from "@lib/layout-api"
import { Navbar, type Link } from "@ui/navbar"
import { Container } from "@ui/container"

/**
 * Макет страницы
 * @namespace Pages.Test.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  const { setTitle } = useLayoutTitle()

  setTitle("Разработка")

  const links: Link[] = [
    {
      label: "Главная",
      path: "/test",
      end: true
    },
    {
      label: "Типографика",
      path: "/test/typo"
    },
    {
      label: "Markdown",
      path: "/test/markdown"
    },
    {
      label: "JSON",
      path: "/test/json"
    }
  ]

  return (
    <>
      <Navbar links={links} />
      <Container>{children}</Container>
    </>
  )
}
