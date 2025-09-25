import { type ReactNode } from "react"
import { useLayoutTitle } from "@lib/layout-api"
import { Navbar } from "@ui/navbar"
import { Container } from "@ui/container"

/**
 * Макет страницы
 * @namespace Pages.Service.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  useLayoutTitle("Сервис")

  const links = [
    { label: "Провайдеры", path: "/service", end: true },
    { label: "Запросы", path: "/service/requests" },
    { label: "Чаты", path: "/service/chats" },
    { label: "Настройки", path: "/service/settings" }
  ]

  return (
    <div className="flex flex-col">
      <Navbar links={links} />
      <Container>{children}</Container>
    </div>
  )
}
