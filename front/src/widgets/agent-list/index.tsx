import { makeClasses } from "@lib/style-api"
// import { Loader } from "@ui/loader"
// import { Notification } from "@ui/notification"
// import { ChatList as AgentListComponent } from "@entities/chat/ui/chat-list"
// import { useAgents } from "@entities/chat/api/chat-queries"
import { Heading } from "@shared/ui/heading"

/**
 * Список чатов
 * @namespace Widgets.AgentList
 */
export const AgentList = () => {
  const classes = makeClasses("flex flex-col")
  // const { agents, isLoading, error } = useAgents()

  // if (isLoading) return <Loader />
  // if (error) return <Notification type="error">{error.message}</Notification>

  return (
    <div className={classes}>
      <Heading level={5}>Агенты</Heading>
      {/* <AgentListComponent chats={chats} /> */}
    </div>
  )
}
