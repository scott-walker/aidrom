import { makeClasses } from "@lib/style-api"
import { Heading } from "@ui/heading"
import { ChatInfoTrigger, useChatInfoToggleStore } from "@features/chat-info-toggle"
import { INFOPBAR_CONTAINER_CLASS } from "../lib/constants"

/**
 * Пропсы для компонента ChatInfo
 * @namespace Features.ChatInterface.UI.ChatInfoBarProps
 */
interface ChatInfoBarProps {
  className?: string
}

/**
 * Информация о чате
 * @namespace Features.ChatInterface.UI.ChatInfoBar
 */
export const ChatInfoBar = ({ className = "" }: ChatInfoBarProps) => {
  const isVisible = useChatInfoToggleStore(state => state.isVisible)
  const containerClasses = makeClasses("flex", "flex-col", "h-full", "bg-background-soft", className)
  const headerClasses = makeClasses("flex", "justify-between", "items-center", "px-(--layout-inner-offset-x)", "py-4")
  const infoClasses = makeClasses(
    "flex-1",
    "flex",
    "flex-col",
    "w-full",
    "overflow-y-auto",
    "scrollbar-hide",
    !isVisible && "hidden",
    INFOPBAR_CONTAINER_CLASS
  )

  return (
    <aside className={containerClasses}>
      <header className={headerClasses}>
        {isVisible && <Heading level={5}>О чате</Heading>}
        <ChatInfoTrigger />
      </header>
      <div className={infoClasses} />
    </aside>
  )
}
