import type { JSX, ComponentProps } from "react"
import { mergeClasses } from "@utils/jsxtools"
import { cardDescriptionClasses } from "./assets"

/**
 * Компонент описания карточки
 * @namespace UI.Card.Description
 * @param {ComponentProps<"div">} props - Свойства компонента
 * @returns {JSX.Element} - Компонент описания карточки
 */
function CardDescription({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return <div data-slot="card-description" className={mergeClasses(cardDescriptionClasses, className)} {...props} />
}

export default CardDescription
