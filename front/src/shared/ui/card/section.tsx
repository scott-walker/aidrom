import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Секция карточки
 * @namespace Shared.UI.Card.CardSection
 */
export const CardSection = ({ children, className }: { children: ReactNode; className?: string }) => {
  const classes = makeClasses("flex", "align-center", "gap-(--ui-card-gap)", "px-(--ui-card-offset-x)", className)

  return <section className={classes}>{children}</section>
}
