import { Button } from "@ui/button"
import { LoaderBlock } from "@ui/loader-block"

import { useUpdateProvider, useProviderById, type Provider } from "@entities/provider"
import { useToast } from "@features/toasts"

import { ProviderForm } from "./provider-form"

/**
 * Пропсы формы обновления провайдера
 * @namespace Features.Provider.UpdateProviderForm.Ui.ProviderUpdateFormProps
 */
type ProviderUpdateFormProps = {
  providerId: number
  onUpdated?: (provider: Provider) => void
}

/**
 * Форма обновления провайдера
 * @namespace Features.Provider.UpdateProviderForm.Ui.UpdateProviderForm
 */
export const ProviderUpdateForm = ({ providerId, onUpdated = () => {} }: ProviderUpdateFormProps) => {
  const { provider, isLoading } = useProviderById(providerId)
  const { mutate: updateProvider } = useUpdateProvider()
  const toast = useToast()

  const onSubmit = (data: Partial<Provider>) => {
    updateProvider(
      { providerId, data: { name: data.name, driver: data.driver } },
      {
        onSuccess: (provider: Provider) => {
          onUpdated(provider)
          toast.success("Провайдер успешно обновлен")
        },
        onError: ({ message }) => {
          toast.error("Произошла ошибка при обновлении провайдера", message)
        }
      }
    )
  }

  if (isLoading) return <LoaderBlock />

  return (
    <ProviderForm onSubmit={onSubmit} provider={provider as Provider}>
      <Button type="submit" schema="primary">
        Обновить
      </Button>
    </ProviderForm>
  )
}
