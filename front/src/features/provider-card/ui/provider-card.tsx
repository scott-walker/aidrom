import { type ReactNode } from "react"
import { useNavigate } from "react-router"

import { IconButton } from "@ui/icon-button"

import { type Provider, ProviderCard as BaseProviderCard } from "@entities/provider"

/**
 * Пропсы карточки провайдера
 * @namespace Features.ProviderCard.Props
 */
type ProviderCardProps = {
  provider: Provider
  children?: ReactNode
}

/**
 * Карточка провайдера
 * @namespace Features.ProviderCard
 */
export const ProviderCard = ({ provider, children }: ProviderCardProps) => {
  const navigate = useNavigate()

  return (
    <BaseProviderCard provider={provider} className="flex flex-row items-center select-none">
      {children}

      <IconButton
        className="ml-2"
        icon="edit"
        iconSize={26}
        onClick={() => navigate(`/service/providers/${provider.id}`)}
      />
    </BaseProviderCard>
  )
}
