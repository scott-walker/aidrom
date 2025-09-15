import { useState, type ReactNode } from "react"

import { Icon } from "@ui/icon"
import { IconButton } from "@ui/icon-button"
import { Modal } from "@ui/modal"

import { type Provider, ProviderCard as BaseProviderCard } from "@entities/provider"
import { ProviderUpdateForm } from "@features/provider-form"

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
  const [edit, setEdit] = useState(false)

  const toggleDetails = () => setDetails(!details)
  const onUpdated = () => setEdit(false)

  const trigger = <IconButton className="ml-2" icon="edit" iconSize={26} />

  return (
    <BaseProviderCard provider={provider} details={details} className=" select-none">
      {children}

      <Modal trigger={trigger} title="Обновление провайдера" open={edit} onOpenChange={setEdit}>
        <div className="py-2 w-lg">
          <ProviderUpdateForm providerId={provider.id} onUpdated={onUpdated} />
        </div>
      </Modal>

      <div className="flex-1 cursor-pointer" onClick={toggleDetails}>
        <Icon name={details ? "chevron-up" : "chevron-down"} className="ml-auto text-foreground-soft" />
      </div>
    </BaseProviderCard>
  )
}
