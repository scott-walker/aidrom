import { IconButton } from "@ui/icon-button"
import { type Chat } from "@entities/chat"
import { useDeleteChat } from "../lib/use-delete-chat"

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

  return <IconButton icon="trash-2" iconSize={20} onClick={() => onDelete(chat.id)} />
}
