import { useState } from "react"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { IconButton } from "@ui/icon-button"
import { Markdown } from "@ui/markdown"
import { type Provider as ProviderType, useUpdateProvider } from "@entities/provider"
import { useToast } from "@features/toasts"

/**
 * Пропсы для компонента ProviderDescription
 * @namespace Features.ProviderDescription.Ui.ProviderDescription.Props
 */
type ProviderDescriptionProps = {
  provider: ProviderType
}

/**
 * Компонент ProviderDescription
 * @namespace Features.ProviderDescription.Ui.ProviderDescription
 */
export const ProviderDescription = ({ provider }: ProviderDescriptionProps) => {
  const [description, setDescription] = useState(provider.description)
  const { mutate: updateProvider, isPending } = useUpdateProvider()
  const toast = useToast()

  const onSave = () => {
    updateProvider(
      { providerId: provider.id, data: { description } },
      {
        onSuccess: () => {
          toast.success("Описание успешно сохранено")
        },
        onError: ({ message }) => {
          toast.error("Произошла ошибка при сохранении описания", message)
        }
      }
    )
  }

  return (
    <Card>
      <Card.Header>
        <Heading>Описание</Heading>
        <div className="flex items-center gap-1">
          <IconButton schema="primary" circle icon="check" iconSize={20} onClick={onSave} disabled={isPending} />
        </div>
      </Card.Header>
      <Card.Body>
        <Markdown editable value={description} onChange={setDescription} />
      </Card.Body>
    </Card>
  )
}
