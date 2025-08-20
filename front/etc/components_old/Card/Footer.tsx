import type { JSX, ComponentProps } from "react"
import { mergeClasses } from "@utils/jsxtools"
import { cardFooterClasses } from "./assets"

/**
 * Компонент подвала карточки
 * @namespace UI.Card.Footer
 * @param {ComponentProps<"div">} props - Свойства компонента
 * @returns {JSX.Element} - Компонент подвала карточки
 */
function CardFooter({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return <div data-slot="card-footer" className={mergeClasses(cardFooterClasses, className)} {...props} />
}

export default CardFooter
