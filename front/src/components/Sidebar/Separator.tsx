import type { ComponentProps, FC, JSX } from "react"
import { Separator } from "@ui/Separator"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.Separator.Props
 */
type Props = ComponentProps<typeof Separator>

/**
 * Конструктор
 * @namespace Sidebar.Separator.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Separator.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для разделителя
 * @namespace Sidebar.Separator.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для разделителя
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses("bg-sidebar-border", "data-[orientation=horizontal]:w-[80%]", "mx-auto", className)
}

/**
 * Компонент разделитель
 * @namespace Sidebar.Separator
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarSeparator
 */
const SidebarSeparator: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarSeparatorClass = makeClasses(className || "")

  return (
    <Separator data-slot="sidebar-separator" data-sidebar="separator" className={sidebarSeparatorClass} {...props} />
  )
}

export default SidebarSeparator
