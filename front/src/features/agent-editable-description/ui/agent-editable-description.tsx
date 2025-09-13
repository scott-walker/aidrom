import { useState } from "react"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { IconButton } from "@ui/icon-button"
import { Markdown } from "@ui/markdown"
import { ErrorBlock } from "@ui/error-block"
import { type Agent as AgentType, AgentDescriptionInfo, useUpdateAgent } from "@entities/agent"

/**
 * Пропсы для компонента AgentEditableDescription
 * @namespace Features.AgentEditableDescription.Ui.AgentEditableDescription.Props
 */
type AgentEditableDescriptionProps = {
  agent: AgentType
}

/**
 * Компонент AgentEditableDescription
 * @namespace Features.AgentEditableDescription.Ui.AgentEditableDescription
 */
export const AgentEditableDescription = ({ agent }: AgentEditableDescriptionProps) => {
  const [edit, setEdit] = useState(false)
  const [description, setDescription] = useState(agent.description)
  const { mutate: updateAgent, isPending, error } = useUpdateAgent()

  const onCancel = () => {
    setEdit(false)
    setDescription(agent.description)
  }
  const onSave = () => {
    updateAgent({ agentId: agent.id, data: { description } }, { onSuccess: () => setEdit(false) })
  }

  if (error) return <ErrorBlock error={error} />

  return (
    <Card>
      <Card.Header>
        <Heading>Описание</Heading>
        {edit ? (
          <div className="flex items-center gap-1">
            <IconButton schema="primary" circle icon="check" iconSize={20} onClick={onSave} disabled={isPending} />
            <IconButton icon="x" iconSize={26} onClick={onCancel} disabled={isPending} />
          </div>
        ) : (
          <IconButton icon="edit" iconSize={26} onClick={() => setEdit(true)} />
        )}
      </Card.Header>
      <Card.Body>
        {edit ? (
          <Markdown editable value={description} onChange={setDescription} />
        ) : (
          <AgentDescriptionInfo agent={agent} />
        )}
      </Card.Body>
    </Card>
  )
}
