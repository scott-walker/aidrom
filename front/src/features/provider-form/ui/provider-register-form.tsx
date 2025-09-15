import { Button } from "@ui/button"
import { LoaderBlock } from "@ui/loader-block"

import { type Provider, type ProviderCreateData, useCreateProvider } from "@entities/provider"
import { useToast } from "@features/toasts"

import { ProviderForm } from "./provider-form"

/**
 * Форма регистрации провайдера
 * @namespace Features.ProviderForm.Ui.ProviderRegisterForm
 */
export const ProviderRegisterForm = () => {
  const { mutate: createProvider, isPending } = useCreateProvider()
  const toast = useToast()

  const onSubmit = (data: Partial<Provider>) => {
    createProvider(data as ProviderCreateData, {
      onSuccess: () => {
        toast.success("Провайдер успешно зарегистрирован")
      },
      onError: ({ message }) => {
        toast.error("Произошла ошибка при регистрации провайдера", message)
      }
    })
  }

  if (isPending) return <LoaderBlock />

  return (
    <ProviderForm onSubmit={onSubmit}>
      <Button type="submit" schema="primary" className="w-full">
        Зарегистрировать
      </Button>
    </ProviderForm>
  )
}
