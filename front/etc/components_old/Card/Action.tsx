import type { JSX, ComponentProps } from "react"
import { mergeClasses } from "@utils/jsxtools"
import { cardActionClasses } from "./assets"

/**
 * Компонент действия карточки
 * @namespace UI.Card.Action
 * @param {ComponentProps<"div">} props - Свойства компонента
 * @returns {JSX.Element} - Компонент действия карточки
 */
function CardAction({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return <div data-slot="card-action" className={mergeClasses(cardActionClasses, className)} {...props} />
}

export default CardAction
