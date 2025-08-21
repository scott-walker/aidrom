import { useState } from "react"

/**
 * Обработчики событий для hover
 * @namespace Hooks.useHover.HoverHandlers
 */
interface HoverHandlers {
  onMouseEnter: () => void
  onMouseLeave: () => void
  onFocus: () => void
  onBlur: () => void
}

/**
 * Интерфейс API предоставляемый хуком
 * @namespace Hooks.useHover.HoverApi
 */
interface HoverApi {
  isHovered: boolean
  handlers: HoverHandlers
}

/**
 * Хук для обработки событий hover
 * @namespace Hooks.useHover
 */
export const useHover = (): HoverApi => {
  const [isHovered, setIsHovered] = useState(false)

  const handleOn = (): void => setIsHovered(true)
  const handleOff = (): void => setIsHovered(false)

  const handlers: HoverHandlers = {
    onMouseEnter: handleOn,
    onMouseLeave: handleOff,
    onFocus: handleOn,
    onBlur: handleOff
  }

  return { isHovered, handlers }
}
