import { Outlet } from "react-router"
import { PageNavbar } from "@widgets/ui/PageNavbar"

/**
 * Макет страницы
 * @namespace Pages.Constructor.Layout
 */
export const ConstructorLayout = () => {
  const links = [
    { label: "Главная", path: "/constructor", end: true },
    { label: "Агенты", path: "/constructor/agents" },
    { label: "Провайдеры", path: "/constructor/providers" },
    { label: "Настройки", path: "/constructor/settings" }
  ]

  return (
    <div className="flex flex-col gap-8">
      <PageNavbar links={links} />
      <Outlet />
    </div>
  )
}
