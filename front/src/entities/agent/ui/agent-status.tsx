import { makeClasses } from "@lib/style-api"
import { Tooltip } from "@ui/tooltip"
import type { Agent } from "../lib/schema"

/**
 * Пропсы для компонента AgentStatus
 * @namespace Entities.Agent.Ui.AgentStatus.Props
 */
type AgentStatusProps = {
  agent: Agent
  className?: string
}

/**
 * Статус агента
 * @namespace Entities.Agent.Ui.AgentStatus
 */
export const AgentStatus = ({ agent, className = "" }: AgentStatusProps) => {
  const tagClasses = makeClasses(
    "w-5",
    "h-5",
    "rounded-full",
    "border-3",
    "border-background-soft",
    agent.isActive ? "bg-positive" : "bg-danger",
    className
  )
  return (
    <Tooltip text={agent.isActive ? "Активен" : "Неактивен"}>
      <div className={tagClasses} />
    </Tooltip>
  )
}
