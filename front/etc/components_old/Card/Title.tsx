import type { JSX, ComponentProps } from "react"
import { mergeClasses } from "@utils/jsxtools"
import { cardTitleClasses } from "./assets"

/**
 * Компонент заголовка карточки
 * @namespace UI.Card.Title
 * @param {ComponentProps<"div">} props - Свойства компонента
 * @returns {JSX.Element} - Компонент заголовка карточки
 */
function CardTitle({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return <div data-slot="card-title" className={mergeClasses(cardTitleClasses, className)} {...props} />
}

export default CardTitle
