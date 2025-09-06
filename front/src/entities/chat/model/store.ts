import { create } from "zustand"
import type { Message, Chat } from "../lib/types"

/**
 * Интерфейс хранилища состояния чата
 * @namespace Entities.Chat.Model.Store.ChatStore
 */
interface ChatStore {
  messages: Message[]
  activeChat: Chat | null
  isLoading: boolean
  addMessage: (message: Message) => void
  setLoading: (isLoading: boolean) => void
}

/**
 * Хранилище состояния чата
 * @namespace Entities.Chat.Model.Store.ChatStore
 */
export const chatStore = create<ChatStore>(set => ({
  messages: [],
  activeChat: null,
  isLoading: false,
  addMessage: message => set(state => ({ messages: [...state.messages, message] })),
  setLoading: isLoading => set({ isLoading })
}))
