import { create } from "zustand"
import { persist } from "zustand/middleware"
import { LS_STATE_KEY } from "../lib/constants"

/**
 * Тип данных для управления скрытием/показом информации о чате
 * @namespace Features.ChatInfoToggle.Lib.ChatInfoToggleStore
 */
type ChatInfoToggleStore = {
  isVisible: boolean
  show: () => void
  hide: () => void
  toggleVisible: () => void
}

/**
 * Хук для управления скрытием/показом информации о чате
 * @namespace Features.ChatInfoToggle.Lib.useChatInfoToggleStore
 */
export const useChatInfoToggleStore = create<ChatInfoToggleStore>()(
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
