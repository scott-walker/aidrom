import { create } from "zustand"
import { persist } from "zustand/middleware"
import { LS_STATE_KEY } from "./constants"

/**
 * Тип данных для управления скрытием/показом списка чатов
 * @namespace Features.ChatListToggle.Lib.ToggleChatListStore
 */
type ToggleChatListStore = {
  isVisible: boolean
  show: () => void
  hide: () => void
  toggleVisible: () => void
}

/**
 * Хук для управления скрытием/показом списка чатов
 * @namespace Features.ChatListToggle.Lib.useToggleChatList
 */
export const useToggleChatList = create<ToggleChatListStore>()(
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
