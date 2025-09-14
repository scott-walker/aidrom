import { Button } from "@ui/button"
import { useCreateAgent } from "@entities/agent"

import { AgentForm } from "./agent-form"
import { type AgentForm as AgentFormType } from "../model/form-schema"
import { toAgentCreateDTO } from "../model/mappers"
import { useToast } from "@features/toasts"

/**
 * Пропсы формы создания агента
 * @namespace Features.AgentForm.Ui.CreateAgentForm.Props
 */
type CreateAgentFormProps = {
  onCreated?: (agent: AgentFormType) => void
}

/**
 * Форма создания агента
 * @namespace Features.AgentForm.Ui.CreateAgentForm
 */
export const CreateAgentForm = ({ onCreated = () => {} }: CreateAgentFormProps) => {
  const { mutate: createAgent } = useCreateAgent()
  const toast = useToast()

  const onSubmit = (data: AgentFormType, resetForm: () => void) => {
    createAgent(toAgentCreateDTO(data), {
      onSuccess: () => {
        onCreated(data)
        resetForm()
        toast.success("Агент успешно создан")
      },
      onError: ({ message }) => {
        toast.error("Произошла ошибка при создании агента", message)
      }
    })
  }

  return (
    <AgentForm onSubmit={onSubmit}>
      <Button type="submit">Создать</Button>
    </AgentForm>
  )
}
