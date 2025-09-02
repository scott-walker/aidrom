import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Шапка карточки
 * @namespace Shared.UI.Card.CardHeader
 */
export const CardHeader = ({ children }: { children: ReactNode }) => {
  const classes = makeClasses(
    "flex",
    "align-center",
    "justify-center",
    "gap-(--ui-card-gap)",
    "px-(--ui-card-offset-x)",
    "py-(--ui-card-offset-y)",
    "border-b-1",
    "border-background-hard"
  )

  return <header className={classes}>{children}</header>
}
