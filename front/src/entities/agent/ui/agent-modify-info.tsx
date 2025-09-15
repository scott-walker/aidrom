import { makeClasses } from "@lib/style-api"
import { DateTag } from "@ui/date-tag"
import type { Agent } from "../lib/schema"

/**
 * Пропсы для компонента AgentModifyInfo
 * @namespace Entities.Agent.Ui.AgentModifyInfo.Props
 */
type AgentModifyInfoProps = {
  agent: Agent
  className?: string
}

/**
 * Информация о модификации агента
 * @namespace Entities.Agent.Ui.AgentModifyInfo
 */
export const AgentModifyInfo = ({ agent, className = "" }: AgentModifyInfoProps) => {
  const containerClasses = makeClasses("flex", "flex-col", "items-center", "gap-0", className)
  const sectionTitleClasses = makeClasses("text-sm", "font-bold", "text-foreground-soft")

  return (
    <div className={containerClasses}>
      <h6 className={sectionTitleClasses}>Обновлен</h6>
      <DateTag date={agent.updatedAt} />
    </div>
  )
}
