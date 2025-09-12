import { Button } from "@ui/button"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"

import { type ProviderCreateData, useCreateProvider } from "@entities/provider"
import { type ProviderForm as ProviderFormType } from "../model/form-schema"

import { ProviderForm } from "./provider-form"

/**
 * Форма регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Ui.RegisterProviderForm
 */
export const ProviderRegisterForm = () => {
  const { mutate: createProvider, isPending, error } = useCreateProvider()

  const onSubmit = (data: ProviderFormType) => {
    createProvider(data as ProviderCreateData, {
      onSuccess: () => {}
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
