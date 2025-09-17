import { makeClasses } from "@lib/style-api"
import { type Agent as AgentType } from "@entities/agent"
import { AgentAddRule, AgentRules as AgentRulesList } from "@features/agent-rules"

/**
 * Пропсы для компонента правил агента
 * @namespace Widgets.AgentRules.Ui.AgentRulesCompact.Props
 */
type AgentRulesCompactProps = {
  agent: AgentType
}

/**
 * Компонент правил агента
 * @namespace Widgets.AgentRules.Ui.AgentRulesCompact
 */
export const AgentRulesCompact = ({ agent }: AgentRulesCompactProps) => {
  const containerClasses = makeClasses("flex flex-col gap-2")

  return (
    <div className={containerClasses}>
      <AgentAddRule agentId={agent.id} />
      <AgentRulesList agentId={agent.id} rules={agent.rules} />
    </div>
  )
}
