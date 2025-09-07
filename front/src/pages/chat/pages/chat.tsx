import type { ReactNode } from "react"
import { useParams } from "react-router"
import { makeClasses } from "@lib/style-api"
import { Container } from "@ui/container"
import { Chat as ChatWindow } from "@widgets/chat"
import { AgentInfo } from "@widgets/agent-info"

/**
 * Страница чата
 * @namespace Pages.Chat.Chat
 * @returns {ReactNode}
 */
export const Chat = (): ReactNode => {
  const { chatId } = useParams()

  const containerClasses = makeClasses("flex items-stretch justify-between h-full")
  const chatClasses = makeClasses("flex-1")
  const agentListClasses = makeClasses("flex", "flex-col", "w-[300px]", "border-l", "border-background-hard")

  return (
    <div className={containerClasses}>
      <ChatWindow className={chatClasses} chatId={Number(chatId)} />

      <Container as="aside" className={agentListClasses}>
        <AgentInfo />
      </Container>
    </div>
  )
}
