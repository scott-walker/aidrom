import { useNavigate } from "react-router"
import { useCreateChat } from "@entities/chat/api/chat-mutations"
import type { Chat } from "@entities/chat/lib/types"
import { useToast } from "@features/toasts"

/**
 * Хук для создания чата
 * @namespace Features.Chat.EmptyChat.Lib.useCreateChat
 */
export const useCreateNewChat = () => {
  const { mutate } = useCreateChat()
  const navigate = useNavigate()
  const toast = useToast()

  /**
   * Создать новый чат
   */
  const createChat = () => {
    mutate(
      { title: "Поговорим об овощах", agentId: 6, clientId: 1 },
      {
        onSuccess: (chat: Chat) => {
          toast.success("Чат создан")
          navigate(`/chat/${chat.id}`)
        }
      }
    )
  }

  return { createChat }
}
