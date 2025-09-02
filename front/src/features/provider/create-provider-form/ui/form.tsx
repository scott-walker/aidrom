import { toCreateProviderDTO } from "../models/mappers"
import { useCreateProviderForm } from "../lib/hooks"
import { Button } from "@ui/button"
import { Input } from "@ui/input"
import { FormField } from "@ui/form-field"
import { Heading } from "@ui/heading"
import { Card } from "@ui/card"

/**
 * Пропсы формы создания провайдера
 * @namespace Features.Provider.CreateProviderForm.Ui.FormProps
 */
type FormProps = {
  onSubmit: (dto: ReturnType<typeof toCreateProviderDTO>) => void
}

/**
 * Форма создания провайдера
 * @namespace Features.Provider.CreateProviderForm.Ui.CreateProviderForm
 */
export const CreateProviderForm = ({ onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useCreateProviderForm()

  return (
    <Card as="form" onSubmit={handleSubmit(values => onSubmit(toCreateProviderDTO(values)))}>
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
          <FormField label="Base URL" error={errors.baserUrl} className="flex-1">
            <Input {...register("baserUrl")} placeholder="Введите базовый API URL" error={!!errors.baserUrl} />
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
