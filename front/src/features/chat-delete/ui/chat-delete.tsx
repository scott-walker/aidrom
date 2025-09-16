import { IconButton } from "@ui/icon-button"
import { Tooltip } from "@ui/tooltip"
import { type Chat } from "@entities/chat"
import { useDeleteChat } from "../lib/use-delete-chat"
import { ModalConfirm } from "@ui/modal-confirm"

/**
 * Пропсы кнопки для удаления чата
 * @namespace Features.ChatDelete.UI.ChatDeleteProps
 */
type ChatDeleteProps = {
  chat: Chat
}

/**
 * Кнопка для удаления чата
 * @namespace Features.ChatDelete.UI.ChatDelete
 */
export const ChatDelete = ({ chat }: ChatDeleteProps) => {
  const { onDelete } = useDeleteChat()

  const trigger = (
    <div className="flex items-center">
      <Tooltip text="Удалить чат">
        <IconButton icon="trash" iconSize={20} />
      </Tooltip>
    </div>
  )

  return (
    <ModalConfirm
      trigger={trigger}
      onApprove={() => onDelete(chat.id)}
      title="Удаление чата"
      description="Вы уверены, что хотите удалить этот чат?"
    />
  )
}
