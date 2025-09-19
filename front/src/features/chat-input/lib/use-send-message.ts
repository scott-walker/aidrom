import { useChatStore } from "@entities/chat"
import { makeLastClientMessage, makeLastAgentMessage } from "@entities/chat"
import { useSendMessage as useApiSendMessage } from "@entities/chat/api/chat-mutations"
import { useToast } from "@features/toasts"

/**
 * Хук для отправки сообщения
 * @namespace Features.Chat.SendMessage.Lib.UseSendMessage
 */
export const useSendMessage = () => {
  const { isPending, setPending, setLastClientMessage, setLastAgentMessage } = useChatStore()
  const { mutate: send } = useApiSendMessage()
  const toast = useToast()

  const sendMessage = async (chatId: number, input: string) => {
    if (!input.trim() || isPending) return

    setLastClientMessage(makeLastClientMessage(input))
    setPending(true)

    const stream = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/chats/${chatId}/stream`)

    stream.onmessage = event => {
      // const data = JSON.parse(event.data)
      // setLastAgentMessage(makeLastAgentMessage(data.agentMessage))
    }
    stream.onopen = () => {
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
            stream.close()
          }
        }
      )
    }
  }

  return {
    isPending,
    sendMessage
  }
}
