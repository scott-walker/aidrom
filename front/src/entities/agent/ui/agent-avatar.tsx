import { Avatar, type AvatarProps } from "@ui/avatar"
import type { Agent } from "../lib/types"

/**
 * Пропсы аватара агента
 * @namespace Entities.Agent.UI.AgentAvatar.Props
 */
type AgentAvatarProps = AvatarProps & {
  agent: Agent
}

/**
 * Аватар агента
 * @namespace Entities.Agent.UI.AgentAvatar
 */
export const AgentAvatar = ({ agent, ...props }: AgentAvatarProps) => {
  return <Avatar src={agent.avatar} {...props} />
}
