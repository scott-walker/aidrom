import { useChatStore } from "@entities/chat"
import { makeLastClientMessage } from "@entities/chat"
import { useSendMessage as useApiSendMessage } from "@entities/chat/api/chat-mutations"
import { useToast } from "@features/toasts"

/**
 * Хук для отправки сообщения
 * @namespace Features.Chat.SendMessage.Lib.UseSendMessage
 */
export const useSendMessage = () => {
  const { input, isPending, setInput, setPending, setLastClientMessage } = useChatStore()
  const { mutate: send } = useApiSendMessage()
  const toast = useToast()

  const sendMessage = async (chatId: number) => {
    if (!input.trim() || isPending) return

    setLastClientMessage(makeLastClientMessage(input))
    setPending(true)
    setInput("")
    send(
      { chatId, data: { message: input } },
      {
        onSuccess: () => {
          setLastClientMessage(null)
          setPending(false)
        },
        onError: ({ message }) => {
          setPending(false)
          toast.error("Произошла ошибка при отправке сообщения", message)
        }
      }
    )
  }

  return {
    input,
    isPending,
    setInput,
    sendMessage
  }
}
