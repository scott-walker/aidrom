import { makeClasses } from "@lib/style-api"
import { Json } from "@ui/json"
import type { Agent } from "../lib/types"

/**
 * Пропсы для компонента AgentParamsInfo
 * @namespace Entities.Agent.Ui.AgentParamsInfo.Props
 */
type AgentParamsInfoProps = {
  agent: Agent
  className?: string
}

/**
 * Информация о параметрах агента
 * @namespace Entities.Agent.Ui.AgentParamsInfo
 */
export const AgentParamsInfo = ({ agent, className = "" }: AgentParamsInfoProps) => {
  const containerClasses = makeClasses("flex", "flex-col", className)

  return (
    <div className={containerClasses}>
      <Json value={agent.params} interactive />
    </div>
  )
}
