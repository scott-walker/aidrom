import { create } from "zustand"

/**
 * Интерфейс хранилища состояния чата
 * @namespace Entities.Chat.Model.ChatStore
 */
interface ChatStore {
  input: string
  isPending: boolean
  setInput: (input: string) => void
  setPending: (isPending: boolean) => void
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
   * Установить введенный текст
   * @namespace Entities.Chat.Model.useChatStore.setInput
   */
  setInput: input => set({ input }),

  /**
   * Установить статус ожидания
   * @namespace Entities.Chat.Model.useChatStore.setPending
   */
  setPending: isPending => set({ isPending })
}))
