import { create } from "zustand"

/**
 * Интерфейс для списка чатов по агентам
 * @namespace Features.ChatAgentList.Lib.Types.ChatAgentListStore
 */
export interface ChatAgentListStore {
  openAgentId: number | null
  setOpenAgentId: (agentId: number) => void
  unsetOpenAgentId: () => void
}

/**
 * Хранилище состояния списка чатов по агентам
 * @namespace Features.ChatAgentList.Model.chatAgentListStore
 */
export const useChatAgentListStore = create<ChatAgentListStore>(set => ({
  openAgentId: null,
  setOpenAgentId: (agentId: number) => {
    set({ openAgentId: agentId })
  },
  unsetOpenAgentId: () => {
    set({ openAgentId: null })
  }
}))
