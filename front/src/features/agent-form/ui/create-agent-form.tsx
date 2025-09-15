import { useNavigate } from "react-router"
import { Button } from "@ui/button"
import { useCreateAgent, type Agent } from "@entities/agent"
import { useToast } from "@features/toasts"

import { AgentForm } from "./agent-form"
import { type AgentForm as AgentFormType } from "../model/form-schema"
import { toAgentCreateDTO } from "../model/mappers"

/**
 * Форма создания агента
 * @namespace Features.AgentForm.Ui.CreateAgentForm
 */
export const CreateAgentForm = () => {
  const { mutate: createAgent } = useCreateAgent()
  const navigate = useNavigate()
  const toast = useToast()

  const onSubmit = (data: AgentFormType) => {
    createAgent(toAgentCreateDTO(data), {
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
    <AgentForm onSubmit={onSubmit}>
      <Button type="submit">Создать</Button>
    </AgentForm>
  )
}
