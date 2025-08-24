import { useState, useRef, useCallback } from "react"

// Задержка по умолчанию
const DEFAULT_DELAY = 150

/**
 * Пропсы для хука
 * @namespace UI.Scrollbar.useAutoHide.Props
 * @property {number} delay - задержка в миллисекундах
 */
export type Config = Partial<{
  delay: number
}>

/**
 * API для скроллбара
 * @namespace UI.Scrollbar.useAutoHide.API
 * @property {boolean} visible - видимость скроллбара
 * @property {() => void} onScrollStart - обработчик начала скролла
 * @property {() => void} onScrollStop - обработчик окончания скролла
 */
export type API = {
  visible: boolean
  onScrollStart: () => void
  onScrollStop: () => void
}

/**
 * Хук для автоматического скрытия скроллбара
 * @namespace UI.Scrollbar.useAutoHide
 * @param {Config} config - конфигурация хука
 * @returns {API}
 */
export function useAutoHide(config: Config = {}): API {
  const { delay = DEFAULT_DELAY } = config
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const onScrollStart = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    setVisible(true)
  }, [])

  const onScrollStop = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(false), delay)
  }, [delay])

  return {
    visible,
    onScrollStart,
    onScrollStop
  }
}
