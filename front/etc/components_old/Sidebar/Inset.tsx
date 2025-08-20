import type { ComponentProps, FC, JSX } from "react"
import { mergeClasses } from "@utils/jsxtools"

/**
 * Пропсы
 * @namespace Sidebar.Inset.Props
 */
type Props = ComponentProps<"main">

/**
 * Конструктор
 * @namespace Sidebar.Inset.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Inset.Component
 */
type Component = JSX.Element

/**
 * Функция для создания класса для контейнера inset
 * @namespace Sidebar.Inset.makeClasses
 * @param className - CSS классы
 * @returns {string} классы для контейнера inset
 */
const makeClasses = (className: string = ""): string => {
  return mergeClasses(
    "bg-background",
    "relative",
    "flex",
    "w-full",
    "flex-1",
    "flex-col",
    "md:peer-data-[variant=inset]:m-2",
    "md:peer-data-[variant=inset]:ml-0",
    "md:peer-data-[variant=inset]:rounded-xl",
    "md:peer-data-[variant=inset]:shadow-sm",
    "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
    className
  )
}

/**
 * Компонент SidebarInset
 * @namespace Sidebar.Inset
 * @type {Constructor}
 * @param Props.className - CSS классы
 * @param Props.props - пропсы для компонента
 * @returns {Component} компонент SidebarInset
 */
const SidebarInset: Constructor = ({ className, ...props }: Props): Component => {
  const sidebarInsetClass = makeClasses(className || "")

  return <main data-slot="sidebar-inset" className={sidebarInsetClass} {...props} />
}

export default SidebarInset
