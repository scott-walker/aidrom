import { useSendMessage, ChatPending as BaseChatPending } from "@entities/chat"

/**
 * Компонент ожидания ответа
 * @namespace Features.ChatPending
 */
export const ChatPending = () => {
  const { isPending } = useSendMessage()

  if (isPending) return <BaseChatPending />

  return null
}
