import { Outlet } from "react-router"
import { PageNavbar } from "@widgets/page-navbar"

/**
 * Макет страницы
 * @namespace Pages.Service.Layout
 */
export const ServiceLayout = () => {
  const links = [
    { label: "Провайдеры", path: "/service", end: true },
    { label: "Запросы", path: "/service/requests" },
    { label: "Настройки", path: "/service/settings" }
  ]

  return (
    <div className="flex flex-col gap-8">
      <PageNavbar links={links} />
      <Outlet />
    </div>
  )
}
