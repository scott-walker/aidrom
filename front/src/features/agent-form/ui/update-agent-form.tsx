import { Button } from "@ui/button"
import { LoaderBlock } from "@ui/loader-block"
import { useAgentById, useUpdateAgent, type Agent } from "@entities/agent"
import { useToast } from "@features/toasts"

import { AgentForm } from "./agent-form"
import { type AgentForm as AgentFormType } from "../model/form-schema"
import { toAgentDTOForm, toAgentUpdateDTO } from "../model/mappers"

/**
 * Пропсы формы обновления агента
 * @namespace Features.AgentForm.Ui.UpdateAgentForm.Props
 */
type UpdateAgentFormProps = {
  agentId: number
  onUpdated?: (agent: AgentFormType) => void
}

/**
 * Форма обновления агента
 * @namespace Features.AgentForm.Ui.UpdateAgentForm
 */
export const UpdateAgentForm = ({ agentId, onUpdated = () => {} }: UpdateAgentFormProps) => {
  const { agent, isLoading } = useAgentById(agentId)
  const { mutate: updateAgent } = useUpdateAgent()
  const values = toAgentDTOForm(agent as Agent)
  const toast = useToast()

  const onSubmit = (data: AgentFormType) => {
    updateAgent(
      { agentId, data: toAgentUpdateDTO(data) },
      {
        onSuccess: () => {
          onUpdated(data)
          toast.success("Агент успешно обновлен")
        },
        onError: ({ message }) => {
          toast.error("Произошла ошибка при обновлении агента", message)
        }
      }
    )
  }

  if (isLoading) return <LoaderBlock />

  return (
    <AgentForm onSubmit={onSubmit} values={values}>
      <Button type="submit">Сохранить</Button>
    </AgentForm>
  )
}
