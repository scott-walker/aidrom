import { makeClasses } from "@lib/style-api"
import { Avatar, type AvatarProps } from "@ui/avatar"
import type { Agent } from "../lib/schema"
import { AgentStatus } from "./agent-status"

/**
 * Пропсы аватара агента (со статусом)
 * @namespace Entities.Agent.UI.AgentStatusAvatar.Props
 */
type AgentStatusAvatarProps = AvatarProps & {
  agent: Agent
}

/**
 * Аватар агента (со статусом)
 * @namespace Entities.Agent.UI.AgentStatusAvatar
 */
export const AgentStatusAvatar = ({ agent, ...props }: AgentStatusAvatarProps) => {
  const containerClasses = makeClasses("relative")

  return (
    <div className={containerClasses}>
      <Avatar src={agent.avatar} {...props} />
      <AgentStatus agent={agent} className="absolute z-10 bottom-0 right-0" />
    </div>
  )
}
