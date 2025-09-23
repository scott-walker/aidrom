import { useEffect, useRef } from "react"
import { useSendMessage as useApiSendMessage, makeAgentMessage, useOptimisticMessage } from "@entities/chat"
import { useToast } from "@features/toasts"
import { createStream } from "./utils"

/**
 * Хук для отправки сообщения
 * @namespace Features.Chat.SendMessage.Lib.UseSendMessage
 */
export const useSendMessage = (chatId: number) => {
  const { mutate: send } = useApiSendMessage()
  const { addMessage, updateLastMessage } = useOptimisticMessage()
  const toast = useToast()
  const stream = useRef<EventSource | null>(null)

  useEffect(() => {
    return () => {
      stream.current?.close()
    }
  }, [chatId])

  /**
   * Отправка сообщения
   * @namespace Features.Chat.SendMessage.Lib.UseSendMessage.sendMessage
   */
  const sendMessage = async (input: string) => {
    if (!input.trim()) return

    const agentMessage = makeAgentMessage(chatId, "")

    stream.current = createStream(chatId, {
      onOpen: () => {
        // toast.info("Соединение открыто")
        // addMessage(clientMessage)
        // setPending(true)
        send(
          { chatId, data: { message: input } },
          {
            onSuccess: () => {},
            onError: ({ message }) => {
              toast.error("Произошла ошибка при отправке сообщения", message)
            },
            onSettled: () => {
              stream.current?.close()
            }
          }
        )
      },
      onStart: () => {
        // toast.info("Начало получения сообщения")
        addMessage(chatId, agentMessage)
      },
      onContent: ({ content }) => {
        updateLastMessage(chatId, { ...agentMessage, content })
      },
      onEnd: () => {
        // toast.info("Сообщение получено")
        // setPending(false)
      },
      onError: ({ message }) => {
        toast.error("Ошибка при отправке сообщения", message)
        // setPending(false)
      }
    })
  }

  return { sendMessage }
}
