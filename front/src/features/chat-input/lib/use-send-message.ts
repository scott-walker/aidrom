import { useChatStore } from "@entities/chat"
import { makeLastClientMessage } from "@entities/chat"
import { useSendMessage as useApiSendMessage } from "@entities/chat/api/chat-mutations"

/**
 * Хук для отправки сообщения
 * @namespace Features.Chat.SendMessage.Lib.UseSendMessage
 */
export const useSendMessage = () => {
  const { input, isPending, setInput, setPending, setLastClientMessage } = useChatStore()
  const { mutate: send } = useApiSendMessage()

  const sendMessage = async (chatId: number) => {
    if (!input.trim() || isPending) return

    setLastClientMessage(makeLastClientMessage(input))
    setPending(true)
    setInput("")

    // Отправить сообщение
    send(
      { chatId, data: { message: input } },
      {
        onSuccess: () => {
          setLastClientMessage(null)
          setPending(false)
        },
        onError: (error: Error) => {
          setPending(false)
          console.error(error)
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
