import type { ReactNode, FC, JSX } from "react"
import { makeClasses } from "@lib/style-api"
import { CardHeader } from "./header"
import { CardBody } from "./body"
import { CardSection } from "./section"
import { CardFooter } from "./footer"

/**
 * Пропсы карточки
 * @namespace Shared.UI.Card.CardProps
 */
type CardProps = {
  as?: keyof JSX.IntrinsicElements
  className?: string
  children: ReactNode
  [key: string]: unknown
}

/**
 * Компонент карточки
 * @namespace Shared.UI.Card.CardComponent
 */
type CardComponent = FC<CardProps> & {
  Header: typeof CardHeader
  Body: typeof CardBody
  Section: typeof CardSection
  Footer: typeof CardFooter
}

/**
 * Карточка
 * @namespace Shared.UI.Card.Card
 */
export const Card: CardComponent = ({ children, as: Component = "article", className = "", ...props }) => {
  const classes = makeClasses(
    "flex",
    "flex-col",
    "w-[700px]",
    "border-1",
    "border-background-hard",
    "bg-background-soft",
    "rounded-xl",
    className
  )

  return (
    <Component {...props} className={classes}>
      {children}
    </Component>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Section = CardSection
Card.Footer = CardFooter
