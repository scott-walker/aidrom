import { makeClasses } from "@lib/style-api"
import type { Chat } from "@entities/chat"
import { AgentInfo } from "@entities/agent"
import { useToggleChatInfo } from "@features/chat-info-toggle"
import { ChatInfoHeader } from "./chat-info-header"
import { DateTag } from "@ui/date-tag"
import { Separator } from "@ui/separator"

/**
 * Пропсы для компонента ChatInfo
 * @namespace Widgets.ChatInfo.UI.ChatInfoProps
 */
type ChatInfoProps = {
  chat: Chat
}

/**
 * Информация о чате
 * @namespace Widgets.ChatInfo.UI.ChatInfo
 */
export const ChatInfo = ({ chat }: ChatInfoProps) => {
  const { isVisible } = useToggleChatInfo()
  const containerClasses = makeClasses(
    "flex",
    "flex-col",
    "h-full",
    "bg-background-soft",
    // isVisible
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
  // const sectionClasses = makeClasses("flex", "flex-col", "px-6")

  return (
    <div className={containerClasses}>
      <ChatInfoHeader />

      <div className={contentClasses}>
        {/* <section className={sectionClasses}>
          <h6>Название чата</h6>
          <div>{chat.title}</div>
        </section>
        <Separator />
        <section className={sectionClasses}>
          <h6>Создан</h6>
          <DateTag date={chat.createdAt} />
        </section>
        <Separator /> */}
        <AgentInfo agent={chat.agent} />
      </div>
    </div>
  )
}
