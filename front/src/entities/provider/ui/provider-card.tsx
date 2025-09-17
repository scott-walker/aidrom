import type { ReactNode } from "react"

import { makeClasses } from "@lib/style-api"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { Tag } from "@ui/tag"

import type { Provider } from "../lib/schema"

/**
 * Пропсы карточки провайдера
 * @namespace Entities.Provider.ProviderCard.Props
 */
type ProviderCardProps = {
  provider: Provider
  children?: ReactNode
  className?: string
  onClick?: () => void
}

/**
 * Карточка провайдера
 * @namespace Entities.Provider.ProviderCard
 */
export const ProviderCard = ({ provider, children, className = "", onClick = () => {} }: ProviderCardProps) => {
  const classes = makeClasses("flex flex-row items-center gap-2 px-4 py-1", className)

  return (
    <Card>
      <Card.Body>
        <div className={classes} onClick={onClick}>
          <div className="text-sm text-foreground-soft font-bold">ID: {provider.id}</div>
          <Heading className="px-4">{provider.name}</Heading>
          <Tag>{provider.driver}</Tag>
          {children}
        </div>
      </Card.Body>
    </Card>
  )
}
