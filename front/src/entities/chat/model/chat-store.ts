import { create } from "zustand"
import type { Message } from "../lib/schema"

/**
 * Интерфейс хранилища состояния чата
 * @namespace Entities.Chat.Model.ChatStore
 */
interface ChatStore {
  isPending: boolean
  lastClientMessage: Message | null
  lastAgentMessage: Message | null
  setPending: (isPending: boolean) => void
  setLastClientMessage: (message: Message | null) => void
  setLastAgentMessage: (message: Message | null) => void
}

/**
 * Хранилище состояния чата
 * @namespace Entities.Chat.Model.useChatStore
 */
export const useChatStore = create<ChatStore>(set => ({
  isPending: false,
  lastClientMessage: null,
  lastAgentMessage: null,
  setPending: isPending => set({ isPending }),
  setLastClientMessage: message => set({ lastClientMessage: message }),
  setLastAgentMessage: message => set({ lastAgentMessage: message })
}))
