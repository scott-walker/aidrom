import { useChatStore, ChatPending as BaseChatPending } from "@entities/chat"

/**
 * Пропсы компонента ожидания ответа
 * @namespace Features.ChatPending.Props
 */
type ChatPendingProps = {
  className?: string
}

/**
 * Компонент ожидания ответа
 * @namespace Features.ChatPending
 */
export const ChatPending = ({ className = "" }: ChatPendingProps) => {
  const isPending = useChatStore(state => state.isPending)

  if (isPending) return <BaseChatPending className={className} />

  return null
}
