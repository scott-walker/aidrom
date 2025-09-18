import { useChatStore } from "@entities/chat"
import { makeLastClientMessage } from "@entities/chat"
import { useSendMessage as useApiSendMessage } from "@entities/chat/api/chat-mutations"
import { useToast } from "@features/toasts"

/**
 * Хук для отправки сообщения
 * @namespace Features.Chat.SendMessage.Lib.UseSendMessage
 */
export const useSendMessage = () => {
  const { isPending, setPending, setLastClientMessage } = useChatStore()
  const { mutate: send } = useApiSendMessage()
  const toast = useToast()

  const sendMessage = async (chatId: number, input: string) => {
    if (!input.trim() || isPending) return

    setLastClientMessage(makeLastClientMessage(input))
    setPending(true)
    send(
      { chatId, data: { message: input } },
      {
        onSuccess: () => {
          setLastClientMessage(null)
        },
        onError: ({ message }) => {
          toast.error("Произошла ошибка при отправке сообщения", message)
        },
        onSettled: () => {
          setPending(false)
        }
      }
    )
  }

  return {
    isPending,
    sendMessage
  }
}
