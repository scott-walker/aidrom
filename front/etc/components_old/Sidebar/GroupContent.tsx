import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.GroupContent.Props
 */
type Props = ComponentProps<"div">

/**
 * Конструктор
 * @namespace Sidebar.GroupContent.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.GroupContent.Component
 */
type Component = JSX.Element

/**
 * Функция для создания CSS класса для контента группы
 * @namespace Sidebar.GroupContent.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для контента группы
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "w-full",
    "text-sm",
    className
  )
}

/**
 * Компонент контент группы
 * @namespace Sidebar.GroupContent
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarGroupContent
 */
const SidebarGroupContent: Constructor = ({ className, ...props }: Props): Component => {
  const classes = makeClasses(className || "")

  return <div data-slot="sidebar-group-content" data-sidebar="group-content" className={classes} {...props} />
}

export default SidebarGroupContent
