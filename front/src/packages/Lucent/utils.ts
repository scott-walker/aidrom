import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { cva } from "class-variance-authority"
import type { LayoutConfig } from "./types"
import {
  THEME_MODE_LIGHT,
  PAGE_MODE_DEFAULT,
  SIDEBAR_MODE_EXPANDED,
  FOOTER_MODE_VISIBLE,
  INFOBAR_MODE_HIDDEN
} from "./constants"

/**
 * Объединяет классы в один строковый класс
 * @param inputs - массив классов
 * @returns строковый класс
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))

/**
 * Создает классы на основе вариантов
 * @param baseClasses - базовые классы
 * @param variants - варианты
 * @returns строковый класс
 */
export { cva }

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
      page: modes.page ?? PAGE_MODE_DEFAULT,
      sidebar: modes.sidebar ?? SIDEBAR_MODE_EXPANDED,
      footer: modes.footer ?? FOOTER_MODE_VISIBLE,
      infobar: modes.infobar ?? INFOBAR_MODE_HIDDEN
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
