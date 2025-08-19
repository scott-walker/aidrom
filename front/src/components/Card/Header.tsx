import type { JSX, ComponentProps } from "react"
import { mergeClasses } from "@utils/jsxtools"
import { cardHeaderClasses } from "./assets"

/**
 * Компонент заголовка карточки
 * @namespace UI.Card.Header
 * @param {ComponentProps<"div">} props - Свойства компонента
 * @returns {JSX.Element} - Компонент заголовка карточки
 */
function CardHeader({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return <div data-slot="card-header" className={mergeClasses(cardHeaderClasses, className)} {...props} />
}

export default CardHeader
