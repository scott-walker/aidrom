import { useState, type ReactNode } from "react"
import { useNavigate } from "react-router"

import { Icon } from "@ui/icon"
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
  const [details, setDetails] = useState(false)
  const navigate = useNavigate()
  const toggleDetails = () => setDetails(!details)

  return (
    <BaseProviderCard provider={provider} details={details} className="flex flex-row items-center select-none">
      {children}

      <IconButton
        className="ml-2"
        icon="edit"
        iconSize={26}
        onClick={() => navigate(`/service/providers/${provider.id}`)}
      />

      <div className="flex-1 cursor-pointer" onClick={toggleDetails}>
        <Icon name={details ? "chevron-up" : "chevron-down"} className="ml-auto text-foreground-soft" />
      </div>
    </BaseProviderCard>
  )
}
