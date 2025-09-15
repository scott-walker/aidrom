import { makeClasses } from "@lib/style-api"
import { Tag } from "@ui/tag"
import type { Agent } from "../lib/schema"
import { AgentStatusAvatar } from "./agent-status-avatar"

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
  const sectionClasses = makeClasses("flex", "flex-col", "items-center", "gap-2", "text-center")
  const avatarClasses = makeClasses()
  const nameClasses = makeClasses("text-lg", "font-bold", "text-center")

  return (
    <div className={containerClasses}>
      <section className={avatarClasses}>
        <AgentStatusAvatar agent={agent} size="xl" />
      </section>
      <div className="flex items-center gap-2 text-sm text-foreground-soft font-bold">
        <div>ID:</div>
        <div>{agent.id}</div>
      </div>
      <section className={sectionClasses}>
        <div className={nameClasses}>{agent.name}</div>
        <Tag>{agent.provider.name}</Tag>
      </section>
    </div>
  )
}
