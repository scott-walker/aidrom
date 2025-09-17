import { type ReactNode } from "react"

import { FormField } from "@ui/form-field"
import { Input } from "@ui/input"
import { Button } from "@ui/button"
import { useToast } from "@features/toasts"

import { type AgentForm as AgentFormType } from "../model/form-schema"
import { useForm } from "../lib/use-form"
import { useUpdateAgent, type Agent } from "@entities/agent"
import { toAgent } from "../model/mappers"

/**
 * Пропсы формы агента
 * @namespace Features.AgentForm.Ui.AgentForm.Props
 */
type FormProps = {
  agent: Agent
  children?: ReactNode
}

/**
 * Форма агента
 * @namespace Features.AgentForm.Ui.AgentForm
 */
export const AgentUpdateForm = ({ agent, children }: FormProps) => {
  const { mutate: updateAgent, isPending } = useUpdateAgent()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(agent)

  const onSubmit = (data: AgentFormType) => {
    updateAgent(
      { agentId: agent.id, data: toAgent(data) },
      {
        onSuccess: () => {
          toast.success("Агент успешно обновлен")
        },
        onError: ({ message }) => {
          toast.error("Произошла ошибка при обновлении агента", message)
        }
      }
    )
  }

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit(data => onSubmit(data))}>
      <div className="flex items-center gap-4">
        <FormField label="Название" error={errors.name} showError={false} className="flex-1">
          <Input {...register("name")} placeholder="Название агента" error={!!errors.name} disabled={isPending} />
        </FormField>

        <FormField label="&nbsp;">
          <Button type="submit" schema="primary" disabled={isPending}>
            Изменить
          </Button>
        </FormField>

        {children}
      </div>
    </form>
  )
}
