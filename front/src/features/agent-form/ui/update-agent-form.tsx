import { Button } from "@ui/button"
import { ErrorBlock } from "@ui/error-block"
import { LoaderBlock } from "@ui/loader-block"
import { useAgentById, useUpdateAgent, type Agent } from "@entities/agent"

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
  const { agent, isLoading, error: fetchError } = useAgentById(agentId)
  const { mutate: updateAgent, isPending, error: updateError } = useUpdateAgent()
  const values = toAgentDTOForm(agent as Agent)

  const onSubmit = (data: AgentFormType) => {
    updateAgent({ agentId, data: toAgentUpdateDTO(data) }, { onSuccess: () => onUpdated(data) })
  }

  if (isLoading || isPending) return <LoaderBlock />
  if (fetchError || updateError) return <ErrorBlock error={(fetchError || updateError) as Error} />

  return (
    <AgentForm onSubmit={onSubmit} values={values}>
      <Button type="submit">Сохранить</Button>
    </AgentForm>
  )
}
