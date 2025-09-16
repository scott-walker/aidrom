import { useDeleteChat as useApiDeleteChat } from "@entities/chat"
import { useToast } from "@features/toasts"

export const useDeleteChat = () => {
  const { mutate: deleteChat } = useApiDeleteChat()
  const toast = useToast()

  const onDelete = (chatId: number) => {
    deleteChat(chatId, {
      onSuccess: () => {
        toast.success("Чат успешно удален")
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
