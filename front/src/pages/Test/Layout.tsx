import { Icon } from "@ui/Icon"
import type { FC, ReactNode } from "react"
import { NavLink, Outlet } from "react-router"

/**
 * Макет для страниц тестирования
 * @namespace Pages.Test.Layout
 * @returns {ReactNode}
 */
export const Layout: FC = (): ReactNode => {
  const makeActiveClass = ({ isActive }: { isActive: boolean }) => (isActive ? "text-gradient-brand" : "")

  return (
    <div className="flex flex-col">
      <h1 className="flex items-center text-4xl">
        <Icon name="amphora" size={48} />
        <div className="ml-6">
          Тестирование <span className="text-gradient-brand">всего и вся</span>
        </div>
      </h1>
      <div className="flex items-center gap-6 mt-12 py-2 px-6 bg-background-soft rounded-2xl shadow-ghost-xs">
        <NavLink to="/test" end className={makeActiveClass}>
          Компоненты
        </NavLink>
        <NavLink to="/test/typography" className={makeActiveClass}>
          Типографика
        </NavLink>
      </div>
      <div className="flex flex-col mt-12 p-6 bg-background-soft rounded-lg shadow-ghost-xs">
        <Outlet />
      </div>
    </div>
  )
}
