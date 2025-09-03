import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы секции карточки
 * @namespace Shared.UI.Card.CardSectionProps
 */
type CardSectionProps = {
  children: ReactNode
  hasOffset?: boolean
  className?: string
}

/**
 * Секция карточки
 * @namespace Shared.UI.Card.CardSection
 */
export const CardSection = ({ children, hasOffset = true, className }: CardSectionProps) => {
  const classes = makeClasses(
    "flex",
    "align-center",
    "gap-(--ui-card-gap)",
    hasOffset && "px-(--ui-card-offset-x)",
    // hasOffset && "py-(--ui-card-offset-y)",
    className
  )

  return <section className={classes}>{children}</section>
}
