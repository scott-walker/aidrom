import { Controller } from "react-hook-form"

import { Input } from "@ui/input"
import { FormField } from "@ui/form-field"
import { Json } from "@ui/json"
import { Markdown } from "@ui/markdown"

import { type ProviderForm as ProviderFormType } from "../model/form-schema"
import { useForm } from "../lib/use-form"
import type { ReactNode } from "react"

/**
 * Пропсы формы обновления провайдера
 * @namespace Features.ProviderForm.Ui.ProviderUpdateFormProps
 */
type FormProps = {
  children: ReactNode
  values?: Partial<ProviderFormType>
  onSubmit?: (provider: ProviderFormType) => void
}

/**
 * Форма провайдера
 * @namespace Features.ProviderForm.Ui.ProviderForm
 */
export const ProviderForm = ({ children, values, onSubmit = () => {} }: FormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm(values)

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(data => onSubmit(data))}>
      <div className="flex flex-col gap-4">
        <section className="flex gap-4">
          <FormField label="Название" error={errors.name} className="flex-1">
            <Input {...register("name")} placeholder="Введите название провайдера" error={!!errors.name} />
          </FormField>
          <FormField label="Драйвер" error={errors.driver} className="flex-1">
            <Input {...register("driver")} placeholder="Введите название драйвера" error={!!errors.driver} />
          </FormField>
        </section>

        <section>
          <FormField label="Конфигурация" error={errors.config} className="flex-1">
            <Controller
              name="config"
              control={control}
              render={({ field, fieldState }) => (
                <Json editable value={field.value} onChange={field.onChange} error={!!fieldState.error} />
              )}
            />
          </FormField>
        </section>

        <section>
          <FormField label="Описание" error={errors.description} className="flex-1">
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Markdown editable value={field.value} onChange={field.onChange} error={!!fieldState.error} />
              )}
            />
          </FormField>
        </section>
      </div>

      <div>{children}</div>
    </form>
  )
}
