import { useState } from "react"
import { Card } from "@ui/card"
import { Heading } from "@ui/heading"
import { IconButton } from "@ui/icon-button"
import { Markdown } from "@ui/markdown"
import { type Agent as AgentType, AgentDescription as BaseAgentDescription, useUpdateAgent } from "@entities/agent"
import { useToast } from "@features/toasts"

/**
 * Пропсы для компонента AgentDescription
 * @namespace Features.AgentDescription.Ui.AgentDescription.Props
 */
type AgentDescriptionProps = {
  agent: AgentType
}

/**
 * Компонент AgentDescription
 * @namespace Features.AgentDescription.Ui.AgentDescription
 */
export const AgentDescription = ({ agent }: AgentDescriptionProps) => {
  const [edit, setEdit] = useState(false)
  const [description, setDescription] = useState(agent.description)
  const { mutate: updateAgent, isPending } = useUpdateAgent()
  const toast = useToast()

  const onCancel = () => {
    setEdit(false)
    setDescription(agent.description)
  }
  const onSave = () => {
    updateAgent(
      { agentId: agent.id, data: { description } },
      {
        onSuccess: () => {
          setEdit(false)
          toast.success("Описание успешно сохранено")
        },
        onError: ({ message }) => {
          toast.error("Произошла ошибка при сохранении описания", message)
        }
      }
    )
  }

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
          <BaseAgentDescription description={description} />
        )}
      </Card.Body>
    </Card>
  )
}
