import type { ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"
import { cn } from "@utils/jsxtools"
import { InfobarCollapseTrigger } from "@ui/triggers"

/**
 * Инфобар макета
 * @namespace App.Layouts.Lucent.Infobar
 * @returns {ReactNode}
 */
export const Infobar = ({ children }: { children: ReactNode }): ReactNode => {
  const collapsed = useLayout().isInfobarCollapsed
  const containerClasses = cn(
    "flex",
    "flex-col",
    "h-full",
    "w-full",
    "py-[var(--layout-inner-offset-y)]",
    !collapsed && "px-[var(--layout-inner-offset-x)]",
    "border-t",
    "border-border",
    "bg-background-soft",
    "shadow-ghost-2xl"
  )
  const headerClasses = cn("flex", "items-center", "gap-4", collapsed ? "justify-center" : "")

  return (
    <div className={containerClasses}>
      <header className={headerClasses}>
        <InfobarCollapseTrigger />
        {!collapsed && <h1>Infobar</h1>}
      </header>
      {!collapsed && <div>{children}</div>}
    </div>
  )
}
