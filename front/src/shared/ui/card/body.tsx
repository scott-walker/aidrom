import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"

/**
 * Тело карточки
 * @namespace Shared.UI.Card.CardBody
 */
export const CardBody = ({ children }: { children: ReactNode }) => {
  const classes = makeClasses(
    "flex",
    "flex-col",
    "gap-(--ui-card-gap)",
    "px-(--ui-card-offset-x)",
    "py-(--ui-card-offset-y)"
  )

  return <div className={classes}>{children}</div>
}
