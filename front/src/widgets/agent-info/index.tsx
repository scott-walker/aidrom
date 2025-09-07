import { makeClasses } from "@lib/style-api"
// import { Loader } from "@ui/loader"
// import { Notification } from "@ui/notification"
// import { ChatList as AgentListComponent } from "@entities/chat/ui/chat-list"
// import { useAgents } from "@entities/chat/api/chat-queries"
import { Heading } from "@shared/ui/heading"

/**
 * Информация об агенте
 * @namespace Widgets.AgentInfo
 */
export const AgentInfo = () => {
  const classes = makeClasses("flex flex-col")
  // const { agents, isLoading, error } = useAgents()

  // if (isLoading) return <Loader />
  // if (error) return <Notification type="error">{error.message}</Notification>

  return (
    <div className={classes}>
      <Heading level={5}>Агент</Heading>
      {/* <AgentListComponent chats={chats} /> */}
    </div>
  )
}
