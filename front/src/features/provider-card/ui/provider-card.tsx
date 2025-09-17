import { type ReactNode } from "react"
import { useNavigate } from "react-router"

import { makeClasses } from "@lib/style-api"
import { type Provider, ProviderCard as BaseProviderCard } from "@entities/provider"

/**
 * Пропсы карточки провайдера
 * @namespace Features.ProviderCard.Props
 */
type ProviderCardProps = {
  provider: Provider
  children?: ReactNode
  className?: string
}

/**
 * Карточка провайдера
 * @namespace Features.ProviderCard
 */
export const ProviderCard = ({ provider, children, className = "" }: ProviderCardProps) => {
  const navigate = useNavigate()
  const cardClasses = makeClasses("flex", "flex-row", "items-center", "select-none", className)

  return (
    <BaseProviderCard
      provider={provider}
      className={cardClasses}
      onClick={() => navigate(`/service/providers/${provider.id}`)}
    >
      {children}
    </BaseProviderCard>
  )
}
