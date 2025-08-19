import type { JSX, ComponentProps } from "react"
import { mergeClasses } from "@utils/jsxtools"
import { cardContentClasses } from "./assets"

/**
 * Компонент содержимого карточки
 * @namespace UI.Card.Content
 * @param {ComponentProps<"div">} props - Свойства компонента
 * @returns {JSX.Element} - Компонент содержимого карточки
 */
function CardContent({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return <div data-slot="card-content" className={mergeClasses(cardContentClasses, className)} {...props} />
}

export default CardContent
