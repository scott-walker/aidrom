import { IconButton } from "@shared/ui/icon-button"
import { ModalConfirm } from "@ui/modal-confirm"
import type { Agent } from "@entities/agent"
import { useAgentDelete } from "../lib/use-agent-delete"

/**
 * Пропсы кнопки для удаления агента
 * @namespace Features.AgentDelete.UI.AgentDeleteProps
 */
type AgentDeleteProps = {
  agent: Agent
}

/**
 * Кнопка для удаления агента
 * @namespace Features.AgentDelete.UI.AgentDelete
 */
export const AgentDelete = ({ agent }: AgentDeleteProps) => {
  const { onDelete } = useAgentDelete()

  return (
    <ModalConfirm
      trigger={<IconButton schema="danger" circle icon="x" iconSize={20} />}
      title="Удаление агента"
      onApprove={() => onDelete(agent.id)}
      schema="danger"
      nearTrigger={false}
    >
      <div className="text-lg">
        <p>Удаление агента приведет к потере всех связанных данных с этим агентом:</p>
        <ul className="pl-10 py-2 list-disc font-bold">
          <li>Правила</li>
          <li>Чаты</li>
          <li>Сообщения</li>
        </ul>
        <p>Вы уверены, что хотите удалить агента?</p>
      </div>
    </ModalConfirm>
  )
}
