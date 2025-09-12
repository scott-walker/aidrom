import { useState, type ReactNode } from "react"
import { Icon } from "@ui/icon"
import type { Provider } from "@entities/provider/lib/types"
import { ProviderCard as BaseProviderCard } from "@entities/provider/ui/provider-card"

/**
 * Пропсы карточки провайдера
 * @namespace Features.ProviderCard.Props
 */
type Props = {
  provider: Provider
  children?: ReactNode
}

/**
 * Карточка провайдера
 * @namespace Features.ProviderCard
 */
export const ProviderCard = ({ provider, children }: Props) => {
  const [details, setDetails] = useState(false)
  const toggleDetails = () => setDetails(!details)

  return (
    <BaseProviderCard
      provider={provider}
      details={details}
      onClick={toggleDetails}
      className="cursor-pointer select-none"
    >
      {children}
      <Icon name={details ? "chevron-up" : "chevron-down"} className="ml-auto text-foreground-soft" />
    </BaseProviderCard>
  )
}
