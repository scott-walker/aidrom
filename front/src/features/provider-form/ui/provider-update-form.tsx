import { Button } from "@ui/button"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"

import { type ProviderUpdateData, useUpdateProvider, useProviderById } from "@entities/provider"
import { type ProviderForm as ProviderFormType } from "../model/form-schema"

import { ProviderForm } from "./provider-form"

/**
 * Пропсы формы обновления провайдера
 * @namespace Features.Provider.UpdateProviderForm.Ui.ProviderUpdateFormProps
 */
type ProviderUpdateFormProps = {
  providerId: number
  onUpdated?: (data: ProviderFormType) => void
}

/**
 * Форма обновления провайдера
 * @namespace Features.Provider.UpdateProviderForm.Ui.UpdateProviderForm
 */
export const ProviderUpdateForm = ({ providerId, onUpdated = () => {} }: ProviderUpdateFormProps) => {
  const { provider, isLoading, error: fetchError } = useProviderById(providerId)
  const { mutate: updateProvider, isPending, error: updateError } = useUpdateProvider()

  const onSubmit = (data: ProviderFormType) => {
    updateProvider(
      { providerId, data: data as ProviderUpdateData },
      { onSuccess: data => onUpdated(data as ProviderFormType) }
    )
  }

  if (isLoading || isPending) return <LoaderBlock />
  if (fetchError || updateError) return <ErrorBlock error={(fetchError || updateError) as Error} />

  return (
    <ProviderForm onSubmit={onSubmit} values={provider as Partial<ProviderFormType>}>
      <Button type="submit" schema="primary" className="w-full">
        Обновить
      </Button>
    </ProviderForm>
  )
}
