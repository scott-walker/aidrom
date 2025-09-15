import { makeClasses } from "@lib/style-api"
import { Markdown } from "@ui/markdown"
import type { Agent } from "../lib/schema"

/**
 * Пропсы для компонента AgentDescriptionInfo
 * @namespace Entities.Agent.Ui.AgentDescriptionInfo.Props
 */
type AgentDescriptionInfoProps = {
  agent: Agent
  className?: string
}

/**
 * Описание агента
 * @namespace Entities.Agent.Ui.AgentDescriptionInfo
 */
export const AgentDescriptionInfo = ({ agent, className = "" }: AgentDescriptionInfoProps) => {
  const containerClasses = makeClasses("flex", "flex-col", className)

  return (
    <div className={containerClasses}>
      {agent.description ? (
        <Markdown value={agent.description} />
      ) : (
        <div className="text-foreground-soft">Нет описания</div>
      )}
    </div>
  )
}
