import type { ReactNode } from "react"

import { makeClasses } from "@lib/style-api"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { Tag } from "@ui/tag"
import { Json } from "@ui/json"
import { Markdown } from "@ui/markdown"
import { Separator } from "@ui/separator"

import type { Provider } from "../lib/schema"

/**
 * Пропсы карточки провайдера
 * @namespace Entities.Provider.ProviderCard.Props
 */
type ProviderCardProps = {
  provider: Provider
  children?: ReactNode
  details?: boolean
  className?: string
  onClick?: () => void
}

/**
 * Карточка провайдера
 * @namespace Entities.Provider.ProviderCard
 */
export const ProviderCard = ({
  provider,
  children,
  details = false,
  className = "",
  onClick = () => {}
}: ProviderCardProps) => {
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
        {details && (
          <>
            <div className="flex flex-col gap-6 px-4 py-6">
              <Separator />
              <section className="flex flex-col gap-2">
                <Heading level={7}>Конфигурация</Heading>
                <Json value={provider.config} interactive minHeight="auto" />
              </section>
              <Separator />
              <section className="flex flex-col gap-2">
                <Heading level={7}>Описание</Heading>
                {provider.description ? (
                  <Markdown value={provider.description} />
                ) : (
                  <div className=" text-foreground-soft">Отсутствует</div>
                )}
              </section>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  )
}
