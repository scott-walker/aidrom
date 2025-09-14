import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы шапки карточки
 * @namespace Shared.UI.Card.CardHeaderProps
 */
type CardHeaderProps = {
  children: ReactNode
  hasOffset?: boolean
  className?: string
}

/**
 * Шапка карточки
 * @namespace Shared.UI.Card.CardHeader
 */
export const CardHeader = ({ children, hasOffset = true, className = "" }: CardHeaderProps) => {
  const classes = makeClasses(
    "flex",
    "items-center",
    "justify-center",
    "gap-(--ui-card-header-gap)",
    "h-(--ui-card-header-height)",
    hasOffset && "px-(--ui-card-offset-x)",
    hasOffset && "py-(--ui-card-offset-y)",
    "border-b-2",
    "border-(--ui-card-border)",
    "overflow-hidden",
    className
  )

  return <header className={classes}>{children}</header>
}
