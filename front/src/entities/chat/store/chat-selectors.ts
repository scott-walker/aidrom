import { useShallow } from "zustand/react/shallow"
import { useChatStore } from "./chat-store"

/**
 * Получить сообщения чата
 * @namespace Entities.Chat.Model.useChatMessages
 */
export const useChatMessages = (chatId: number) => {
  return useChatStore(useShallow(state => state.messages.filter(message => message.chatId === chatId)))
}
