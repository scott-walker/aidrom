import { IconButton } from "@ui/icon-button"
import { Tooltip } from "@ui/tooltip"
import { TOOLTIP_TEXT, TOOLTIP_DELAY, ICON, TOOLTIP_SIDE, ICON_SIZE } from "../lib/constants"
import { useChatInfoToggleStore } from "../store/chat-info-toggle"

/**
 * Триггер для переключения видимости информации о чате
 * @namespace Features.ChatInfoToggle.UI.ChatInfoTrigger
 */
export const ChatInfoTrigger = () => {
  const { isVisible, toggleVisible } = useChatInfoToggleStore()

  const iconName = isVisible ? ICON.SHOW : ICON.HIDE
  const tooltipText = isVisible ? TOOLTIP_TEXT.HIDE : TOOLTIP_TEXT.SHOW

  return (
    <Tooltip text={tooltipText} side={TOOLTIP_SIDE} delay={TOOLTIP_DELAY}>
      <IconButton icon={iconName} iconSize={ICON_SIZE} onClick={toggleVisible} />
    </Tooltip>
  )
}
