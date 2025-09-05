import { NavLink } from "react-router"
import { makeClasses } from "@lib/style-api"

/**
 * Тип ссылки
 * @namespace Widgets.Layouts.UI.PageNavbar.Link
 */
export type Link = {
  label: string
  path: string
  end?: boolean
}

/**
 * Пропсы для навигации по странице
 * @namespace Widgets.Layouts.UI.PageNavbar.Props
 */
export type PageNavbarProps = {
  links: Link[]
}

/**
 * Навигация по странице
 * @namespace Widgets.Layouts.UI.PageNavbar
 */
export const PageNavbar = ({ links }: PageNavbarProps) => {
  const makeLinkClass = ({ isActive }: { isActive: boolean }) => {
    return makeClasses(
      "px-6",
      "py-4",
      "border-b-2",
      "border-transparent",
      !isActive && "hover:text-primary",
      isActive && "font-bold",
      isActive && "cursor-default",
      isActive && "border-primary"
    )
  }

  return (
    <nav className="flex items-center border-b border-border">
      {links.map(link => (
        <NavLink to={link.path} end={link.end} className={makeLinkClass} key={link.path}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
