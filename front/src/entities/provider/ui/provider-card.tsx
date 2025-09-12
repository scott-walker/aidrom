import type { ReactNode } from "react"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { Tag } from "@ui/tag"
import type { Provider } from "../lib/types"
import { Json } from "@ui/json"
import { Markdown } from "@ui/markdown"
import { Separator } from "@ui/separator"
import { makeClasses } from "@shared/lib/style-api"

/**
 * Пропсы карточки провайдера
 * @namespace Entities.Provider.ProviderCard.Props
 */
type Props = {
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
export const ProviderCard = ({ provider, children, details = false, className = "", onClick = () => {} }: Props) => {
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
            <Separator />
            <div className="flex flex-col gap-4 px-4 py-2">
              <section className="flex flex-col gap-2">
                <Heading level={7}>Конфигурация</Heading>
                <Json value={provider.config} />
              </section>
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
