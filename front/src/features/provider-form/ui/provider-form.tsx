import type { ReactNode } from "react"
import { Controller } from "react-hook-form"

import { Input } from "@ui/input"
import { FormField } from "@ui/form-field"
import { Select } from "@shared/ui/select-old"

import { type Provider, useDrivers } from "@entities/provider"
import { type ProviderForm as ProviderFormType } from "../model/form-schema"
import { toProvider } from "../model/mapper"
import { useForm } from "../lib/use-form"

/**
 * Пропсы формы провайдера
 * @namespace Features.ProviderForm.Ui.ProviderFormProps
 */
type ProviderFormProps = {
  children: ReactNode
  provider?: Partial<Provider>
  onSubmit?: (data: Partial<Provider>) => void
}

/**
 * Форма провайдера
 * @namespace Features.ProviderForm.Ui.ProviderForm
 */
export const ProviderForm = ({ children, provider, onSubmit = () => {} }: ProviderFormProps) => {
  const { drivers, isLoading } = useDrivers()
  const driversItems = drivers.map((driver: string) => ({
    label: driver,
    value: driver
  }))

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm(provider)

  const onInnerSubmit = (data: ProviderFormType) => {
    const provider = toProvider(data) as Partial<Provider>
    onSubmit(provider)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onInnerSubmit)}>
      <div className="flex items-start gap-4">
        <FormField label="Название" error={errors.name} showError={false} className="flex-1">
          <Input {...register("name")} placeholder="Введите название провайдера" error={!!errors.name} />
        </FormField>
        <FormField label="Драйвер" error={errors.driver} showError={false} className="flex-1">
          <Controller
            name="driver"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                items={driversItems}
                value={field.value}
                onChangeValue={value => field.onChange(value)}
                placeholder="Выберите драйвер"
                error={!!fieldState.error}
                disabled={isLoading}
              />
            )}
          />
        </FormField>
        <FormField label="&nbsp;">{children}</FormField>
      </div>
    </form>
  )
}
