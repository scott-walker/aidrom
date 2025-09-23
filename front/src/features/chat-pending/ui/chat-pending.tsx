import { useChatStore, ChatPending as BaseChatPending } from "@entities/chat"

/**
 * Компонент ожидания ответа
 * @namespace Features.ChatPending
 */
export const ChatPending = () => {
  const isPending = useChatStore(state => state.isPending)

  if (isPending) return <BaseChatPending />

  return null
}
