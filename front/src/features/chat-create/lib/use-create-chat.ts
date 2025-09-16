import { useToast } from "@features/toasts"
import { type Chat, useCreateChat as useApiCreateChat } from "@entities/chat"
import { useNavigate } from "react-router"

/**
 * Пропсы для хука создания чата
 * @namespace Features.ChatCreate.Lib.useCreateChat.Props
 */
type UseCreateChatProps = {
  agentId: number
  clientId: number
}

/**
 * Хук для создания чата
 * @namespace Features.ChatCreate.Lib.useCreateChat
 */
export const useCreateChat = ({ agentId, clientId }: UseCreateChatProps) => {
  const { mutate } = useApiCreateChat()
  const navigate = useNavigate()
  const toast = useToast()

  const createChat = (title: string) => {
    mutate(
      { title, agentId, clientId },
      {
        onSuccess: (chat: Chat) => {
          toast.success(`Чат "${chat.title}" успешно создан`)
          navigate(`/chat/${chat.id}`)
        },
        onError: ({ message }) => {
          toast.error(`Произошла ошибка при создании чата "${title}"`, message)
        }
      }
    )
  }

  return { createChat }
}
