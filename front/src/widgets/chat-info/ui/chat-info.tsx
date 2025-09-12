import { makeClasses } from "@lib/style-api"
import { LoaderBlock } from "@ui/loader-block"
import { ErrorBlock } from "@ui/error-block"
import { useChatById, type Chat } from "@entities/chat"
import { AgentInfo } from "@entities/agent"
import { useToggleChatInfo } from "@features/chat-info-toggle"
import { ChatInfoHeader } from "./chat-info-header"

/**
 * Пропсы для компонента ChatInfo
 * @namespace Widgets.ChatInfo.UI.ChatInfoProps
 */
type ChatInfoProps = {
  chatId: number
}

/**
 * Информация о чате
 * @namespace Widgets.ChatInfo.UI.ChatInfo
 */
export const ChatInfo = ({ chatId }: ChatInfoProps) => {
  const { chat, isLoading, error } = useChatById(chatId)
  const { agent } = (chat as Chat) ?? {}

  const { isVisible } = useToggleChatInfo()
  const containerClasses = makeClasses(
    "flex",
    "flex-col",
    "h-full",
    "bg-background-soft",
    isVisible && "w-[300px]",
    !isVisible && "w-fit"
  )
  const contentClasses = makeClasses(
    "flex",
    "flex-col",
    "py-6",
    "overflow-y-auto",
    "scrollbar-hide",
    !isVisible && "hidden"
  )

  if (isLoading) return <LoaderBlock />
  if (error) return <ErrorBlock error={error} />

  return (
    <div className={containerClasses}>
      <ChatInfoHeader />
      <div className={contentClasses}>
        <AgentInfo agent={agent} />
      </div>
    </div>
  )
}
