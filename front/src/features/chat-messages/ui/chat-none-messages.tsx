import { MessageEmptyList, useChatStore, type Message } from "@entities/chat"

/**
 * Пропсы компонента пустого списка сообщений
 * @namespace Features.ChatNoneMessages.Props
 */
type ChatNoneMessagesProps = {
  messages: Message[]
}

/**
 * Компонент пустого списка сообщений
 * @namespace Features.ChatNoneMessages
 */
export const ChatNoneMessages = ({ messages }: ChatNoneMessagesProps) => {
  const { messages: lastMessages } = useChatStore()

  if (!messages.length && !lastMessages.length) {
    return <MessageEmptyList />
  }

  return null
}
