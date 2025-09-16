import { makeClasses } from "@lib/style-api"
import { LoaderBlock } from "@ui/loader-block"
import { Separator } from "@ui/separator"
import { Json } from "@ui/json"

import { useChatById } from "@entities/chat"
import { AgentFaceInfo, AgentModifyInfo, useAgentById, type Agent } from "@entities/agent"
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
  const { chat, isLoading: isChatLoading } = useChatById(chatId)
  const { agent, isLoading: isAgentLoading } = useAgentById(chat?.agentId as number)
  const chatAgent = agent as Agent

  const { isVisible } = useToggleChatInfo()
  const containerClasses = makeClasses(
    "flex",
    "flex-col",
    "h-full",
    "bg-background-soft",
    isVisible ? "w-full" : "w-fit"
  )
  const contentClasses = makeClasses(
    "flex",
    "flex-col",
    "gap-6",
    "py-6",
    "overflow-y-auto",
    "scrollbar-hide",
    // "w-[400px]",
    !isVisible && "hidden"
  )

  if (isChatLoading || isAgentLoading) {
    return (
      <div className={containerClasses}>
        <LoaderBlock />
      </div>
    )
  }

  const sectionClasses = makeClasses("px-(--layout-inner-offset-x)", "w-full", "text-sm")
  const sectionTitleClasses = makeClasses("text-lg", "font-bold")
  const sectionContentClasses = makeClasses("mt-2", "text-sm")

  return (
    <div className={containerClasses}>
      <ChatInfoHeader />
      <div className={contentClasses}>
        <AgentFaceInfo agent={chatAgent} />

        {/* <Separator className="bg-background-hard" />
        <AgentRulesCompact agent={chatAgent} /> */}
        <Separator className="bg-background-hard" />
        <section className={sectionClasses}>
          <h6 className={sectionTitleClasses}>Параметры</h6>
          <Json value={chatAgent.params} className={sectionContentClasses} />
        </section>
        <Separator className="bg-background-hard" />
        <AgentModifyInfo agent={chatAgent} />
      </div>
    </div>
  )
}
