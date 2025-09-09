import { useCallback, type ChangeEvent } from "react"
import { useRegisterProviderForm } from "../lib/hooks"
import {
  type RegisterProviderForm as RegisterProviderFormType,
  type RegisterProviderFormPartial
} from "../model/schema"
import { Button } from "@ui/button"
import { Input } from "@ui/input"
import { FormField } from "@ui/form-field"
import { Heading } from "@ui/heading"
import { Card } from "@ui/card"

/**
 * Пропсы формы регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Ui.FormProps
 */
type FormProps = {
  values: RegisterProviderFormPartial
  onSubmit: (provider: RegisterProviderFormType) => void
  onChange: (provider: RegisterProviderFormPartial) => void
}

/**
 * Форма регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Ui.RegisterProviderForm
 */
export const ProviderRegisterForm = ({ values, onSubmit, onChange }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useRegisterProviderForm(values)

  /**
   * Обработчик изменения значения поля формы
   * @namespace Features.Provider.RegisterProviderForm.Ui.RegisterProviderForm.handleChange
   */
  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...values, [target.name]: target.value })
    },
    [onChange, values]
  )

  return (
    <Card as="form" onSubmit={handleSubmit(values => onSubmit(values))}>
      <Card.Header>
        <Heading>Регистрация провайдера</Heading>
      </Card.Header>

      <Card.Body>
        <Card.Section>
          {/* <FormFieldInput
            {...register("name")}
            label="Название"
            className="flex-1"
            placeholder="Введите название провайдера"
            onChange={handleChange}
          /> */}

          <FormField label="Название" error={errors.name} className="flex-1">
            <Input
              {...register("name")}
              placeholder="Введите название провайдера"
              error={!!errors.name}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Системное имя" error={errors.alias} className="flex-1">
            <Input
              {...register("alias")}
              placeholder="Введите системное имя провайдера"
              error={!!errors.alias}
              onChange={handleChange}
            />
          </FormField>
        </Card.Section>

        <Card.Section>
          <FormField label="Base URL" error={errors.baseUrl} className="flex-1">
            <Input
              {...register("baseUrl")}
              placeholder="Введите базовый API URL"
              error={!!errors.baseUrl}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="API Key" error={errors.apiKey} className="flex-1">
            <Input
              {...register("apiKey")}
              placeholder="Введите API-ключ"
              error={!!errors.apiKey}
              onChange={handleChange}
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
