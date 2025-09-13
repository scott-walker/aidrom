import type { ReactNode } from "react"
import { Controller } from "react-hook-form"

import { FormField } from "@ui/form-field"
import { Input } from "@ui/input"
import { Json } from "@ui/json"
import { Markdown } from "@ui/markdown"
import { Select } from "@ui/select"
import { SelectAvatar } from "@ui/select-avatar"
import { useProviders } from "@entities/provider"

import { type AgentForm as AgentFormType } from "../model/form-schema"
import { useForm } from "../lib/use-form"

/**
 * Пропсы формы агента
 * @namespace Features.AgentForm.Ui.AgentForm.Props
 */
type FormProps = {
  children: ReactNode
  values?: Partial<AgentFormType>
  onSubmit?: (agent: AgentFormType) => void
}

/**
 * Форма агента
 * @namespace Features.AgentForm.Ui.AgentForm
 */
export const AgentForm = ({ children, values, onSubmit = () => {} }: FormProps) => {
  const providers = useProviders().providers.map(provider => ({
    label: provider.name,
    value: provider.id.toString()
  }))

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm(values)

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(data => onSubmit(data))}>
      <div className="flex flex-col gap-4">
        <section>
          <Controller
            name="avatar"
            control={control}
            render={({ field, fieldState }) => (
              <SelectAvatar value={field.value} onChangeValue={field.onChange} error={!!fieldState.error} />
            )}
          />
        </section>
        <section className="flex gap-4">
          <FormField label="Название" error={errors.name} className="flex-1">
            <Input {...register("name")} placeholder="Введите название провайдера" error={!!errors.name} />
          </FormField>

          <FormField label="Провайдер" error={errors.providerId} className="flex-1">
            <Controller
              name="providerId"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  className="w-full"
                  items={providers}
                  value={field.value}
                  onChangeValue={value => field.onChange(value)}
                  error={!!fieldState.error}
                  placeholder="Выберите провайдера"
                />
              )}
            />
          </FormField>
        </section>

        <section>
          <FormField label="Параметры" error={errors.params} className="flex-1">
            <Controller
              name="params"
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
