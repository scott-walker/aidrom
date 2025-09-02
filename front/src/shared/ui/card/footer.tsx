import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Футер карточки
 * @namespace Shared.UI.Card.CardFooter
 */
export const CardFooter = ({ children }: { children: ReactNode }) => {
  const classes = makeClasses(
    "flex",
    "align-center",
    "justify-center",
    "gap-(--ui-card-gap)",
    "px-(--ui-card-offset-x)",
    "py-(--ui-card-offset-y)",
    "border-t-2",
    "border-(--ui-card-border)"
  )

  return <footer className={classes}>{children}</footer>
}
