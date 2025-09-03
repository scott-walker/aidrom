import { toRegisterProviderSchema } from "../model/mappers"
import { useRegisterProviderForm } from "../lib/hooks"
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
  onSubmit: (dto: ReturnType<typeof toRegisterProviderSchema>) => void
}

/**
 * Форма регистрации провайдера
 * @namespace Features.Provider.RegisterProviderForm.Ui.RegisterProviderForm
 */
export const RegisterProviderForm = ({ onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useRegisterProviderForm()

  return (
    <Card as="form" onSubmit={handleSubmit(values => onSubmit(toRegisterProviderSchema(values)))}>
      <Card.Header>
        <Heading level={3}>Регистрация провайдера</Heading>
      </Card.Header>

      <Card.Body>
        <Card.Section>
          <FormField label="Название" error={errors.name} className="flex-1">
            <Input {...register("name")} placeholder="Введите название провайдера" error={!!errors.name} />
          </FormField>

          <FormField label="Системное имя" error={errors.alias} className="flex-1">
            <Input {...register("alias")} placeholder="Введите системное имя провайдера" error={!!errors.alias} />
          </FormField>
        </Card.Section>

        <Card.Section>
          <FormField label="Base URL" error={errors.baseUrl} className="flex-1">
            <Input {...register("baseUrl")} placeholder="Введите базовый API URL" error={!!errors.baseUrl} />
          </FormField>

          <FormField label="API Key" error={errors.apiKey} className="flex-1">
            <Input {...register("apiKey")} placeholder="Введите API-ключ" error={!!errors.apiKey} />
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
