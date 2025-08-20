import type { ComponentProps, FC, JSX } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components_old/ui/Sheet"
import { useSidebar } from "../hooks"
import {
  makeNotCollapsibleSidebarClass,
  makeSheetContentClass,
  makeSheetContentInnerClass,
  makeSheetContentStyle,
  makeSheetHeaderClass,
  makeSidebarRootClass,
  makeSidebarGapClass,
  makeSidebarContainerClass,
  makeSidebarInnerClass
} from "./assets"

/**
 * Пропсы
 * @namespace Sidebar.Root.Props
 */
type Props = ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

/**
 * Конструктор
 * @namespace Sidebar.Root.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Root.Component
 */
type Component = JSX.Element

/**
 * Компонент Sidebar
 * @namespace Sidebar.Root
 * @param Props.side - сторона сайдбара
 * @param Props.variant - вариант сайдбара
 * @param Props.collapsible - схлопывание сайдбара
 * @param Props.className - классы для сайдбара
 * @param Props.children - дочерние элементы
 * @param Props.props - пропсы для сайдбара
 */
const Sidebar: Constructor = ({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: Props): Component => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  // Если сайдбар не схлопывается
  if (collapsible === "none") {
    const classes = makeNotCollapsibleSidebarClass(className || "")

    return (
      <div data-slot="sidebar" className={classes} {...props}>
        {children}
      </div>
    )
  }

  // Если сайдбар схлопывается на мобильном устройстве
  if (isMobile) {
    const sheetContentClass = makeSheetContentClass(className || "")
    const sheetContentStyle = makeSheetContentStyle()
    const sheetContentInnerClass = makeSheetContentInnerClass()
    const sheetHeaderClass = makeSheetHeaderClass()

    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className={sheetContentClass}
          style={sheetContentStyle}
          side={side}
        >
          <SheetHeader className={sheetHeaderClass}>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>

          <div className={sheetContentInnerClass}>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  const sidebarRootClass = makeSidebarRootClass()
  const sidebarGapClass = makeSidebarGapClass(variant)
  const sidebarContainerClass = makeSidebarContainerClass(side, variant, className || "")
  const sidebarInnerClass = makeSidebarInnerClass()

  // Если сайдбар схлопывается на десктопе
  return (
    <div
      className={sidebarRootClass}
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* Это чтобы был пробел на десктопе */}
      <div data-slot="sidebar-gap" className={sidebarGapClass} />
      <div data-slot="sidebar-container" className={sidebarContainerClass} {...props}>
        <div data-sidebar="sidebar" data-slot="sidebar-inner" className={sidebarInnerClass}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
