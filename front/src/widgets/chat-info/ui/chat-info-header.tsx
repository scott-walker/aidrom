import { makeClasses } from "@lib/style-api"
import { Heading } from "@shared/ui/heading"
import { useToggleChatInfo, ChatInfoTrigger } from "@features/chat-info-toggle"

/**
 * Заголовок информации о чате
 * @namespace Widgets.ChatInfo.UI.ChatInfoHeader
 */
export const ChatInfoHeader = () => {
  const { isVisible } = useToggleChatInfo()
  const headerClasses = makeClasses("flex", "justify-between", "items-center", "px-6", "py-4")

  return (
    <header className={headerClasses}>
      {isVisible && <Heading level={5}>О чате</Heading>}
      <ChatInfoTrigger />
    </header>
  )
}
