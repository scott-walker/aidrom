import { useNavigate } from "react-router"
import { useDeleteChat as useApiDeleteChat } from "@entities/chat"
import { useToast } from "@features/toasts"

/**
 * Хук для удаления чата
 * @namespace Features.ChatDelete.Lib.useDeleteChat
 */
export const useDeleteChat = () => {
  const { mutate: deleteChat } = useApiDeleteChat()
  const toast = useToast()
  const navigate = useNavigate()

  const onDelete = (chatId: number) => {
    deleteChat(chatId, {
      onSuccess: () => {
        toast.success("Чат успешно удален")
        navigate("/chat")
      },
      onError: () => {
        toast.error("Произошла ошибка при удалении чата")
      }
    })
  }

  return {
    onDelete
  }
}
