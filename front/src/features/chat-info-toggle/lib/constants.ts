import type { IconName } from "@ui/icon"

/**
 * Ключ для хранения состояния (в localStorage)
 * @namespace Features.ChatInfoToggle.Lib.Constants.LS_STATE_KEY
 */
export const LS_STATE_KEY = "chat-info-state"

/**
 * Текст для тултипа
 * @namespace Features.ChatInfoToggle.Lib.Constants.TOOLTIP_TEXT
 */
export const TOOLTIP_TEXT = {
  SHOW: "Показать информацию о чате",
  HIDE: "Скрыть информацию о чате"
}

/**
 * Иконка для кнопки
 * @namespace Features.ChatInfoToggle.Lib.Constants.ICON
 */
export const ICON = {
  SHOW: "panel-left-open" as IconName,
  HIDE: "panel-right-open" as IconName
}

/**
 * Размер иконки
 * @namespace Features.ChatInfoToggle.Lib.Constants.ICON_SIZE
 */
export const ICON_SIZE = 24

/**
 * Задержка для тултипа
 * @namespace Features.ChatInfoToggle.Lib.Constants.TOOLTIP_DELAY
 */
export const TOOLTIP_DELAY = 500

/**
 * Сторона для тултипа
 * @namespace Features.ChatInfoToggle.Lib.Constants.TOOLTIP_SIDE
 */
export const TOOLTIP_SIDE = "left"
