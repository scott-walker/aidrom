import { NavLink } from "react-router"
import { makeClasses } from "@lib/style-api"

/**
 * Тип ссылки
 * @namespace Widgets.Layouts.UI.Navbar.Link
 */
export type Link = {
  label: string
  path: string
  end?: boolean
}

/**
 * Пропсы для навигации по странице
 * @namespace Widgets.Layouts.UI.Navbar.Props
 */
export type NavbarProps = {
  links: Link[]
}

/**
 * Навигация по странице
 * @namespace Widgets.Layouts.UI.Navbar
 */
export const Navbar = ({ links }: NavbarProps) => {
  const classes = makeClasses("flex", "items-center", "border-b", "border-border", "px-(--layout-inner-offset-x)")
  const makeLinkClass = ({ isActive }: { isActive: boolean }) => {
    return makeClasses(
      "px-6",
      "py-4",
      "border-b-2",
      "border-transparent",
      "hover:text-primary",
      // !isActive && "hover:border-background-hard",
      isActive && "font-bold",
      isActive && "border-primary"
    )
  }

  return (
    <nav className={classes}>
      {links.map(link => (
        <NavLink to={link.path} end={link.end} className={makeLinkClass} key={link.path}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
