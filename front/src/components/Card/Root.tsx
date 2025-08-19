import type { JSX, ComponentProps } from "react"
import { mergeClasses } from "@utils/jsxtools"
import { cardClasses } from "./assets"

/**
 * Основной компонент карточки
 * @namespace UI.Card.Root
 * @param {ComponentProps<"div">} props - Свойства компонента
 * @returns {JSX.Element} - Основной компонент карточки
 */
function Card({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return <div data-slot="card" className={mergeClasses(cardClasses, className)} {...props} />
}

export default Card
