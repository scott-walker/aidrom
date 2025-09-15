import { create } from "zustand"
import type { Message } from "../lib/schema"

/**
 * Интерфейс хранилища состояния чата
 * @namespace Entities.Chat.Model.ChatStore
 */
interface ChatStore {
  input: string
  isPending: boolean
  lastClientMessage: Message | null
  setInput: (input: string) => void
  setPending: (isPending: boolean) => void
  setLastClientMessage: (message: Message | null) => void
}

/**
 * Хранилище состояния чата
 * @namespace Entities.Chat.Model.useChatStore
 */
export const useChatStore = create<ChatStore>(set => ({
  input: "",
  isPending: false,
  lastClientMessage: null,
  setInput: input => set({ input }),
  setPending: isPending => set({ isPending }),
  setLastClientMessage: message => set({ lastClientMessage: message })
}))
