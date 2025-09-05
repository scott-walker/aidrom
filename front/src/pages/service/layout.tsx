import { type ReactNode } from "react"
import { PageNavbar } from "@widgets/page-navbar"
import { useTitle } from "@lib/layout-api"

/**
 * Макет страницы
 * @namespace Pages.Service.Layout
 */
export const Layout = ({ children }: { children: ReactNode }) => {
  useTitle("Сервис")

  const links = [
    { label: "Провайдеры", path: "/service", end: true },
    { label: "Запросы", path: "/service/requests" },
    { label: "Настройки", path: "/service/settings" }
  ]

  return (
    <div className="flex flex-col gap-8">
      <PageNavbar links={links} />
      {children}
    </div>
  )
}
