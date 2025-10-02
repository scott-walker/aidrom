import { Controller } from "react-hook-form"
import { Json } from "@ui/json"
import { IconButton } from "@ui/icon-button"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { type Provider, useUpdateProvider } from "@entities/provider"
import { useToast } from "@features/toasts"
import { useForm } from "../lib/use-form"
import { type ProviderConfigForm } from "../model/form-schema"
import { toProvider } from "../model/mapper"

/**
 * Пропсы для компонента ProviderConfig
 * @namespace Features.ProviderConfig.Ui.ProviderConfig.Props
 */
type ProviderConfigProps = {
  provider: Provider
}

/**
 * Конфигурация провайдера
 * @namespace Features.ProviderConfig.Ui.ProviderConfig
 */
export const ProviderConfig = ({ provider }: ProviderConfigProps) => {
  const { mutate: updateProvider, isPending } = useUpdateProvider()
  const { handleSubmit, control } = useForm(provider)
  const toast = useToast()

  const onSave = (data: ProviderConfigForm) => {
    updateProvider(
      { providerId: provider.id, data: toProvider(data) },
      {
        onSuccess: () => {
          toast.success("Конфигурация успешно сохранена")
        },
        onError: ({ message }) => {
          toast.error("Произошла ошибка при сохранении конфигурации", message)
        }
      }
    )
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSave)}>
        <Card.Header>
          <Heading>Конфигурация</Heading>
          <div className="flex items-center gap-1">
            <IconButton schema="primary" circle icon="check" iconSize={20} type="submit" disabled={isPending} />
          </div>
        </Card.Header>
        <Card.Body>
          <Controller
            name="config"
            control={control}
            render={({ field, fieldState }) => (
              <Json editable value={field.value} onChange={field.onChange} error={!!fieldState.error} />
            )}
          />
        </Card.Body>
      </form>
    </Card>
  )
}
