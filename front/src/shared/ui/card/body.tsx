import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы тела карточки
 * @namespace Shared.UI.Card.CardBodyProps
 */
type CardBodyProps = {
  children: ReactNode
  hasOffset?: boolean
  className?: string
}

/**
 * Тело карточки
 * @namespace Shared.UI.Card.CardBody
 */
export const CardBody = ({ children, hasOffset = true, className = "" }: CardBodyProps) => {
  const classes = makeClasses(
    "flex",
    "flex-col",
    "gap-(--ui-card-gap)",
    hasOffset && "px-(--ui-card-offset-x)",
    hasOffset && "py-(--ui-card-offset-y)",
    className
  )

  return <div className={classes}>{children}</div>
}
