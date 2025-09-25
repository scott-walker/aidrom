import { useNavigate } from "react-router"
import { Controller } from "react-hook-form"

import { Button } from "@ui/button"
import { FormField } from "@ui/form-field"
import { Input } from "@ui/input"
import { Select } from "@shared/ui/select-old"
import { SelectAvatar } from "@ui/select-avatar"

import { useCreateAgent, type Agent, type AgentCreateData } from "@entities/agent"
import { useProviders } from "@entities/provider"
import { useToast } from "@features/toasts"

import { useForm } from "../lib/use-form"
import { type AgentForm } from "../model/form-schema"
import { toAgent } from "../model/mappers"

/**
 * Форма создания агента
 * @namespace Features.AgentForm.Ui.AgentCreateForm
 */
export const AgentCreateForm = () => {
  const { mutate: createAgent, isPending } = useCreateAgent()
  const navigate = useNavigate()
  const toast = useToast()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const providers = useProviders().providers.map(provider => ({
    label: provider.name,
    value: provider.id.toString()
  }))

  const onSubmitForm = (data: AgentForm) => {
    createAgent(toAgent(data) as AgentCreateData, {
      onSuccess: (agent: Agent) => {
        navigate(`/agents/${agent.id}`)
        toast.success("Агент успешно создан")
      },
      onError: ({ message }) => {
        toast.error("Произошла ошибка при создании агента", message)
      }
    })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(data => onSubmitForm(data))}>
      <div className="flex flex-col gap-4">
        <section>
          <Controller
            name="avatar"
            control={control}
            render={({ field, fieldState }) => (
              <SelectAvatar
                value={field.value}
                onChangeValue={field.onChange}
                error={!!fieldState.error}
                disabled={isPending}
              />
            )}
          />
        </section>
        <section className="flex gap-4">
          <FormField label="Название" error={errors.name} className="flex-1">
            <Input
              {...register("name")}
              placeholder="Введите название провайдера"
              error={!!errors.name}
              disabled={isPending}
            />
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
                  disabled={isPending}
                />
              )}
            />
          </FormField>
        </section>
      </div>

      <div className="flex justify-center">
        <Button type="submit" schema="primary" disabled={isPending}>
          Создать
        </Button>
      </div>
    </form>
  )
}
