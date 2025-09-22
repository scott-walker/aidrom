import { useEffect, useRef } from "react"
import { useChatStore } from "@entities/chat"
import { useSendMessage as useApiSendMessage, makeClientMessage, makeAgentMessage } from "@entities/chat"
import { useToast } from "@features/toasts"
import { createStream } from "./utils"

/**
 * Хук для отправки сообщения
 * @namespace Features.Chat.SendMessage.Lib.UseSendMessage
 */
export const useSendMessage = (chatId: number) => {
  const setPending = useChatStore(state => state.setPending)
  const addMessage = useChatStore(state => state.addMessage)
  const updateMessage = useChatStore(state => state.updateMessage)
  const clearMessages = useChatStore(state => state.clearMessages)

  const { mutate: send } = useApiSendMessage()
  const toast = useToast()
  const stream = useRef<EventSource | null>(null)

  useEffect(() => {
    return () => {
      console.log("useSendMessage unmounted")
      stream.current?.close()
      clearMessages()
    }
  }, [clearMessages, chatId])

  /**
   * Отправка сообщения
   * @namespace Features.Chat.SendMessage.Lib.UseSendMessage.sendMessage
   */
  const sendMessage = async (input: string) => {
    if (!input.trim()) return

    const clientMessage = makeClientMessage(chatId, input)
    const agentMessage = makeAgentMessage(chatId, "")

    stream.current = createStream(chatId, {
      onOpen: () => {
        // toast.info("Соединение открыто")
        addMessage(clientMessage)
        setPending(true)
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
        addMessage(agentMessage)
      },
      onContent: ({ content }) => {
        updateMessage({ ...agentMessage, content })
      },
      onEnd: () => {
        // toast.info("Сообщение получено")
        setPending(false)
      },
      onError: ({ message }) => {
        toast.error("Ошибка при отправке сообщения", message)
        setPending(false)
      }
    })
  }

  return { sendMessage }
}
