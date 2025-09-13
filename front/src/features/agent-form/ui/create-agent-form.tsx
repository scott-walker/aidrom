import { Button } from "@ui/button"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import { useCreateAgent } from "@entities/agent"

import { AgentForm } from "./agent-form"
import { type AgentForm as AgentFormType } from "../model/form-schema"
import { toAgentCreateDTO } from "../model/mappers"

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
  const { mutate: createAgent, isPending, error } = useCreateAgent()

  const onSubmit = (data: AgentFormType) => {
    console.log({
      data,
      dto: toAgentCreateDTO(data)
    })

    createAgent(toAgentCreateDTO(data), {
      onSuccess: () => onCreated(data)
    })
  }

  if (isPending) return <LoaderBlock />
  if (error) return <ErrorBlock error={error} />

  return (
    <AgentForm onSubmit={onSubmit}>
      <Button type="submit">Создать</Button>
    </AgentForm>
  )
}
