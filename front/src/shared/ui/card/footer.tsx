import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы футера карточки
 * @namespace Shared.UI.Card.CardFooterProps
 */
type CardFooterProps = {
  children: ReactNode
  hasOffset?: boolean
  className?: string
}

/**
 * Футер карточки
 * @namespace Shared.UI.Card.CardFooter
 */
export const CardFooter = ({ children, hasOffset = true, className = "" }: CardFooterProps) => {
  const classes = makeClasses(
    "flex",
    "align-center",
    "justify-center",
    "gap-(--ui-card-gap)",
    hasOffset && "px-(--ui-card-offset-x)",
    hasOffset && "py-(--ui-card-offset-y)",
    "border-t-2",
    "border-(--ui-card-border)",
    className
  )

  return <footer className={classes}>{children}</footer>
}
