import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.Footer.Props
 */
type Props = ComponentProps<"div">

/**
 * Конструктор
 * @namespace Sidebar.Footer.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Footer.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для футера
 * @namespace Sidebar.Footer.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для футера
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "flex",
    "flex-col",
    "gap-2",
    "p-2",
    className
  )
}

/**
 * Компонент футер
 * @namespace Sidebar.Footer
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarFooter
 */
const SidebarFooter: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarFooterClass = makeClasses(className || "")

  return <div data-slot="sidebar-footer" data-sidebar="footer" className={sidebarFooterClass} {...props} />
}

export default SidebarFooter
