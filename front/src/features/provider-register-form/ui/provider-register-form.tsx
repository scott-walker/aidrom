import { Controller } from "react-hook-form"

import { Button } from "@ui/button"
import { Input } from "@ui/input"
import { FormField } from "@ui/form-field"
import { Heading } from "@ui/heading"
import { Card } from "@ui/card"
import { Json } from "@ui/json"
import { Markdown } from "@ui/markdown"
import { Loader } from "@ui/loader"
import { ErrorBlock } from "@ui/error-block"
import { type ProviderCreateData, useCreateProvider } from "@entities/provider"

import { type RegisterProviderForm as RegisterProviderFormType } from "../model/form-schema"
import { useRegisterForm } from "../lib/use-register-form"

/**
 * Пропсы формы регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Ui.FormProps
 */
type FormProps = {
  values?: Partial<RegisterProviderFormType>
  onSubmit?: (provider: RegisterProviderFormType) => void
}

/**
 * Форма регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Ui.RegisterProviderForm
 */
export const ProviderRegisterForm = ({ values, onSubmit }: FormProps) => {
  const { mutate: createProvider, isPending, error } = useCreateProvider()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useRegisterForm(values)

  const myHandleSubmit = (data: RegisterProviderFormType) => {
    createProvider(data as ProviderCreateData, {
      onSuccess: () => onSubmit?.(data)
    })
  }

  return (
    <Card as="form" onSubmit={handleSubmit(myHandleSubmit)}>
      <Card.Header>
        <Heading>Регистрация провайдера</Heading>
        {isPending && <Loader />}
      </Card.Header>

      <Card.Body>
        {error && (
          <Card.Section>
            <ErrorBlock error={error} />
          </Card.Section>
        )}

        <Card.Section>
          <FormField label="Название" error={errors.name} className="flex-1">
            <Input {...register("name")} placeholder="Введите название провайдера" error={!!errors.name} />
          </FormField>
          <FormField label="Драйвер" error={errors.driver} className="flex-1">
            <Input {...register("driver")} placeholder="Введите название драйвера" error={!!errors.driver} />
          </FormField>
        </Card.Section>

        <Card.Section>
          <FormField label="Конфигурация" error={errors.config} className="flex-1">
            <Controller
              name="config"
              control={control}
              render={({ field, fieldState }) => (
                <Json editable value={field.value} onChange={field.onChange} error={!!fieldState.error} />
              )}
            />
          </FormField>
        </Card.Section>

        <Card.Section>
          <FormField label="Описание" error={errors.description} className="flex-1">
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Markdown editable value={field.value} onChange={field.onChange} error={!!fieldState.error} />
              )}
            />
          </FormField>
        </Card.Section>
      </Card.Body>

      <Card.Footer>
        <Button type="submit" schema="primary">
          Зарегистрировать провайдер
        </Button>
      </Card.Footer>
    </Card>
  )
}
