import { Button } from "@ui/button"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"

import { type ProviderCreateData, useCreateProvider } from "@entities/provider"
import { useToast } from "@features/toasts"

import { type ProviderForm as ProviderFormType } from "../model/form-schema"
import { ProviderForm } from "./provider-form"

/**
 * Форма регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Ui.RegisterProviderForm
 */
export const ProviderRegisterForm = () => {
  const { mutate: createProvider, isPending, error } = useCreateProvider()
  const toast = useToast()

  const onSubmit = (data: ProviderFormType) => {
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
  if (error) return <ErrorBlock error={error} />

  return (
    <ProviderForm onSubmit={onSubmit}>
      <Button type="submit" schema="primary" className="w-full">
        Зарегистрировать
      </Button>
    </ProviderForm>
  )
}
