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
 * Хук для обработки событий hover
 * @namespace Hooks.useHover
 */
export const useHover = () => {
  const [isHovered, setIsHovered] = useState(false)

  const handleOn = () => setIsHovered(true)
  const handleOff = () => setIsHovered(false)

  const handlers: HoverHandlers = {
    onMouseEnter: handleOn,
    onMouseLeave: handleOff,
    onFocus: handleOn,
    onBlur: handleOff
  }

  return { isHovered, handlers }
}
