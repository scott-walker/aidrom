import { type ComponentProps, type FC, type JSX } from "react"
import { makeNotCollapsibleSidebarClass, makeSheetContentClass, makeSheetContentStyle } from "./assets"
import { useSidebar } from "./hooks"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@ui/Sheet"

/**
 * Пропсы 
 * @namespace Sidebar.Sidebar.Props
 */
type Props = ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

/**
 * Конструктор
 * @namespace Sidebar.Sidebar.Constructor
 */
type Constructor = FC<Props>

/**
 * Компонент
 * @namespace Sidebar.Sidebar.Component
 */
type Component = JSX.Element

/**
 * Компонент Sidebar
 * @namespace Sidebar.Sidebar
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
    const sheetContentStyle = makeSheetContentStyle(style || {})

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
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  // Если сайдбар схлопывается на десктопе
  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
