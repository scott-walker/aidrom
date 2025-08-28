import { clsx, type ClassValue } from "clsx"
import type { LayoutConfig } from "./types"
import {
  THEME_MODE_LIGHT,
  HEADER_MODE_VISIBLE,
  FOOTER_MODE_VISIBLE,
  SIDEBAR_MODE_VISIBLE,
  SIDEBAR_MODE_COLLAPSED,
  INFOBAR_MODE_VISIBLE,
  INFOBAR_MODE_COLLAPSED
} from "./constants"

/**
 * Объединяет классы в один строковый класс
 * @param inputs - массив классов
 * @returns строковый класс
 */
export const cn = (...inputs: ClassValue[]): string => clsx(inputs)

/**
 * Нормализовать конфигурацию макета
 * @param {LayoutConfig} config Конфигурация макета
 * @returns {LayoutConfig} Нормализованная конфигурация макета
 */
export const normalizeConfig = (config: LayoutConfig): LayoutConfig => {
  config = config ?? {}

  const modes = config.modes ?? {}
  const slots = config.slots ?? {}
  const sidebarSlots = slots.sidebar ?? {}

  return {
    modes: {
      theme: modes.theme ?? THEME_MODE_LIGHT,
      headerVisible: modes.headerVisible ?? HEADER_MODE_VISIBLE,
      footerVisible: modes.footerVisible ?? FOOTER_MODE_VISIBLE,
      sidebarVisible: modes.sidebarVisible ?? SIDEBAR_MODE_VISIBLE,
      sidebarCollapsed: modes.sidebarCollapsed ?? SIDEBAR_MODE_COLLAPSED,
      infobarVisible: modes.infobarVisible ?? INFOBAR_MODE_VISIBLE,
      infobarCollapsed: modes.infobarCollapsed ?? INFOBAR_MODE_COLLAPSED
    },
    slots: {
      header: slots.header ?? null,
      sidebar: {
        header: sidebarSlots.header ?? null,
        body: sidebarSlots.body ?? null,
        footer: sidebarSlots.footer ?? null
      },
      content: slots.content ?? null,
      infobar: slots.infobar ?? null,
      footer: slots.footer ?? null
    }
  }
}
