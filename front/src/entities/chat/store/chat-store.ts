import { create } from "zustand"
// import { devtools } from "zustand/middleware"
import type { Message } from "../lib/schema"

/**
 * Интерфейс хранилища состояния чата
 * @namespace Entities.Chat.Model.ChatStore
 */
interface ChatStore {
  input: string
  isPending: boolean
  messages: Message[]
  setInput: (input: string) => void
  setPending: (isPending: boolean) => void
  addMessage: (message: Message) => void
  updateMessage: (message: Message) => void
}

/**
 * Хранилище состояния чата
 * @namespace Entities.Chat.Model.useChatStore
 */
export const useChatStore = create<ChatStore>(set => ({
  /**
   * Введенный текст
   * @namespace Entities.Chat.Model.useChatStore.input
   */
  input: "",

  /**
   * Статус ожидания
   * @namespace Entities.Chat.Model.useChatStore.isPending
   */
  isPending: false,

  /**
   * Сообщения
   * @namespace Entities.Chat.Model.useChatStore.messages
   */
  messages: [],

  /**
   * Установить введенный текст
   * @namespace Entities.Chat.Model.useChatStore.setInput
   */
  setInput: input => set({ input }),

  /**
   * Установить статус ожидания
   * @namespace Entities.Chat.Model.useChatStore.setPending
   */
  setPending: isPending => set({ isPending }),

  /**
   * Добавить сообщение
   * @namespace Entities.Chat.Model.useChatStore.addMessage
   */
  addMessage: message => {
    console.log("addMessage", message)

    set(state => {
      return { messages: [...state.messages, message] }
    })
  },

  /**
   * Обновить сообщение
   * @namespace Entities.Chat.Model.useChatStore.updateMessage
   */
  updateMessage: message => {
    set(state => {
      return { messages: state.messages.map(m => (m.id === message.id ? message : m)) }
    })
  }
}))
