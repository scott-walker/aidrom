import { create } from "zustand"
import { persist } from "zustand/middleware"
import { LS_STATE_KEY } from "../lib/constants"

/**
 * Тип данных для управления скрытием/показом списка чатов
 * @namespace Features.ChatListToggle.Lib.ChatListToggleStore
 */
type ChatListToggleStore = {
  isVisible: boolean
  show: () => void
  hide: () => void
  toggleVisible: () => void
}

/**
 * Хук для управления скрытием/показом списка чатов
 * @namespace Features.ChatListToggle.Lib.useChatListToggleStore
 */
export const useChatListToggleStore = create<ChatListToggleStore>()(
  persist(
    set => ({
      isVisible: false,
      show: () => set({ isVisible: true }),
      hide: () => set({ isVisible: false }),
      toggleVisible: () => set(state => ({ isVisible: !state.isVisible }))
    }),
    { name: LS_STATE_KEY }
  )
)
