import { makeClasses } from "@lib/style-api"
import { Heading } from "@shared/ui/heading"
import { useChatInfoToggleStore, ChatInfoTrigger } from "@features/chat-info-toggle"

/**
 * Заголовок информации о чате
 * @namespace Widgets.ChatInfo.UI.ChatInfoHeader
 */
export const ChatInfoHeader = () => {
  const { isVisible } = useChatInfoToggleStore()
  const headerClasses = makeClasses("flex", "justify-between", "items-center", "px-(--layout-inner-offset-x)", "py-4")

  return (
    <header className={headerClasses}>
      {isVisible && <Heading level={5}>О чате</Heading>}
      <ChatInfoTrigger />
    </header>
  )
}
