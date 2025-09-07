import { useNavigate } from "react-router"
import { useCreateChat } from "@entities/chat/api/chat-mutations"
import type { Chat } from "@entities/chat/lib/types"

/**
 * Хук для создания чата
 * @namespace Features.Chat.EmptyChat.Lib.useCreateChat
 */
export const useCreateNewChat = () => {
  const { mutate } = useCreateChat()
  const navigate = useNavigate()

  /**
   * Создать новый чат
   */
  const createChat = () => {
    mutate(
      { title: "Новый чат", agentId: 3, clientId: 1 },
      {
        onSuccess: (chat: Chat) => {
          navigate(`/chat/${chat.id}`)
        }
      }
    )
  }

  return { createChat }
}
