import { NavLink, Outlet } from "react-router"
import { Icon } from "@shared/ui/icon"
import { cn } from "@shared/utils/jsxtools"

/**
 * Макет страницы
 * @namespace Pages.Test.Layout
 */
export const TestLayout = () => {
  const makeLinkClass = ({ isActive }: { isActive: boolean }) => {
    const activeClasses = cn(
      "bg-background-soft",
      "text-foreground-hard",
      "font-bold",
      "hover:text-foreground-hard",
      "cursor-default"
    )

    return cn([
      "block",
      "h-full",
      "px-6",
      "py-4",
      "rounded-tl-lg",
      "rounded-tr-lg",
      "transition-colors",
      "duration-250",
      "hover:text-primary",
      isActive && activeClasses
    ])
  }

  return (
    <div className="flex flex-col">
      <h1 className="flex items-center text-4xl">
        <Icon name="amphora" size={48} />
        <div className="ml-6">
          Тестирование <span className="text-gradient-brand">всего и вся</span>
        </div>
      </h1>
      <div className="flex items-center mt-10 bg-background">
        <NavLink to="/test" end className={makeLinkClass}>
          Главная
        </NavLink>
        <NavLink to="/test/ui" end className={makeLinkClass}>
          Компоненты
        </NavLink>
        <NavLink to="/test/typography" className={makeLinkClass}>
          Типографика
        </NavLink>
        <NavLink to="/test/form" className={makeLinkClass}>
          Формы
        </NavLink>
      </div>
      <div className="flex flex-col p-6 bg-background-soft rounded-bl-lg rounded-br-lg">
        <Outlet />
      </div>
    </div>
  )
}
