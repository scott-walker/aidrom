import type { ReactNode } from "react"
import { useLayoutStore } from "@lib/layout-api"
import { makeClasses } from "@lib/style-api"
import { Heading } from "@ui/heading"
import { Icon } from "@ui/icon"
import { Brand } from "@ui/brand"
import { LayoutThemeTrigger } from "@features/layout-theme-trigger"

/**
 * Пропсы хедера
 * @namespace Widgets.LayoutHeader.Props
 */
interface LayoutHeaderProps {
  className?: string
}

/**
 * Хедер
 * @namespace Widgets.LayoutHeader
 */
export const LayoutHeader = ({ className = "" }: LayoutHeaderProps): ReactNode => {
  const title = useLayoutStore(state => state.title)
  const subtitle = useLayoutStore(state => state.subtitle)
  const classes = makeClasses(
    "flex",
    "items-center",
    "justify-between",
    "gap-8",
    "px-[var(--layout-inner-offset-x)]",
    "h-full",
    "border-b",
    "border-border",
    className
  )

  return (
    <div className={classes}>
      <div className="flex-1 flex items-center gap-8">
        <Brand />
        <Heading level={7} className="flex-1 flex items-center justify-center gap-6">
          {title}
          {subtitle && <Icon name="chevron-right" size={20} strokeWidth={3} />}
          {subtitle}
        </Heading>
      </div>
      <div className="flex items-center gap-4">
        <LayoutThemeTrigger />
      </div>
    </div>
  )
}
