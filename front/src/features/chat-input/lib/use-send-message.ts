import { useChatStore } from "@entities/chat"
import { useSendMessage as useApiSendMessage, makeClientMessage, makeAgentMessage } from "@entities/chat"
import { useToast } from "@features/toasts"
import { createStream } from "./utils"

/**
 * Хук для отправки сообщения
 * @namespace Features.Chat.SendMessage.Lib.UseSendMessage
 */
export const useSendMessage = () => {
  // console.log("useSendMessage")

  const { input, isPending, setPending, addMessage, updateMessage, setInput } = useChatStore()
  const { mutate: send } = useApiSendMessage()
  const toast = useToast()

  /**
   * Отправка сообщения
   * @namespace Features.Chat.SendMessage.Lib.UseSendMessage.sendMessage
   */
  const sendMessage = async (chatId: number) => {
    if (!input.trim() || isPending) return

    const clientMessage = makeClientMessage(chatId, input)
    const agentMessage = makeAgentMessage(chatId, "")

    const stream = createStream(chatId, {
      onOpen: () => {
        toast.info("Соединение открыто")

        addMessage(clientMessage)
        setInput("")
        setPending(true)
        send(
          { chatId, data: { message: input } },
          {
            onSuccess: () => {},
            onError: ({ message }) => {
              toast.error("Произошла ошибка при отправке сообщения", message)
            },
            onSettled: () => {
              stream.close()
            }
          }
        )
      },
      onStart: () => {
        toast.info("Начало получения сообщения")
        addMessage(agentMessage)
      },
      onChunk: ({ content }) => {
        updateMessage({ ...agentMessage, content })
      },
      onEnd: () => {
        toast.info("Сообщение получено")
        setPending(false)
      },
      onError: ({ message }) => {
        toast.error("Ошибка при отправке сообщения", message)
      }
    })
  }

  return {
    isPending,
    sendMessage
  }
}
