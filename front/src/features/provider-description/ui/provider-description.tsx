import { useState } from "react"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { IconButton } from "@ui/icon-button"
import { Markdown } from "@ui/markdown"
import {
  type Provider as ProviderType,
  useUpdateProvider,
  ProviderDescription as BaseProviderDescription
} from "@entities/provider"
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
  const [edit, setEdit] = useState(false)
  const [description, setDescription] = useState(provider.description)
  const { mutate: updateProvider, isPending } = useUpdateProvider()
  const toast = useToast()

  const onSave = () => {
    updateProvider(
      { providerId: provider.id, data: { description } },
      {
        onSuccess: () => {
          setEdit(false)
          toast.success("Описание успешно сохранено")
        },
        onError: ({ message }) => {
          toast.error("Произошла ошибка при сохранении описания", message)
        }
      }
    )
  }

  const onCancel = () => {
    setEdit(false)
    setDescription(provider.description)
  }

  return (
    <Card>
      <Card.Header>
        <Heading>Описание</Heading>
        {edit ? (
          <div className="flex items-center gap-1">
            <IconButton schema="primary" circle icon="check" iconSize={20} onClick={onSave} disabled={isPending} />
            <IconButton icon="x" iconSize={26} onClick={onCancel} disabled={isPending} />
          </div>
        ) : (
          <IconButton icon="edit" iconSize={26} onClick={() => setEdit(true)} />
        )}
      </Card.Header>
      <Card.Body>
        {edit ? (
          <Markdown editable value={description} onChange={setDescription} />
        ) : (
          <BaseProviderDescription description={description} />
        )}
      </Card.Body>
    </Card>
  )
}
