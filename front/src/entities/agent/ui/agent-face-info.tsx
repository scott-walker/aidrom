import { makeClasses } from "@lib/style-api"
import { Tag } from "@ui/tag"
import type { Agent } from "../lib/types"
import { AgentAvatar } from "./agent-avatar"

/**
 * Пропсы для компонента AgentFaceInfo
 * @namespace Entities.Agent.Ui.AgentFaceInfo.Props
 */
type AgentFaceInfoProps = {
  agent: Agent
  className?: string
}

/**
 * Лицо агента
 * @namespace Entities.Agent.Ui.AgentFaceInfo
 */
export const AgentFaceInfo = ({ agent, className = "" }: AgentFaceInfoProps) => {
  const containerClasses = makeClasses("flex", "flex-col", "items-center", "gap-3", className)
  const avatarClasses = makeClasses()
  const nameClasses = makeClasses("text-lg", "font-bold", "text-center")

  return (
    <div className={containerClasses}>
      <section className={avatarClasses}>
        <AgentAvatar agent={agent} size="xl" />
      </section>
      <section>
        <div className={nameClasses}>{agent.name}</div>
        <Tag>{agent.provider.name}</Tag>
      </section>
    </div>
  )
}
