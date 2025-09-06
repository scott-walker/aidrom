import type { Chat } from "../lib/types"
import { useChats } from "./queries"

/**
 * Выбрать чат по ID
 * @namespace Entities.Chat.Model.Hooks.useChatById
 */
export const useChatById = (chatId: number): Chat => {
  const { chats } = useChats()
  const chat = chats.find(chat => chat.id === chatId)

  if (!chat) {
    throw new Error("Чат не найден")
  }

  return chat
}
