import { type ReactNode } from "react"
import { useTitle } from "@lib/layout-api"
import { Navbar } from "@ui/navbar"
import { Container } from "@ui/container"

/**
 * Макет страницы
 * @namespace Pages.Service.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  useTitle("Сервис")

  const links = [
    { label: "Провайдеры", path: "/service/providers" },
    { label: "Запросы", path: "/service/requests" },
    { label: "Настройки", path: "/service/settings" }
  ]

  return (
    <div className="flex flex-col">
      <Navbar links={links} />
      <Container>{children}</Container>
    </div>
  )
}
