import { type AgentRule as AgentRuleType } from "@entities/agent"
import { IconButton } from "@ui/icon-button"
import { AgentRule } from "./agent-rule"

/**
 * Пропсы для компонента AgentRules
 * @namespace Features.AgentRules.Ui.AgentRule.Props
 */
type AgentRulesProps = {
  rules: AgentRuleType[]
}

/**
 * Компонент AgentRules
 * @namespace Features.AgentRules.Ui.AgentRule
 */
export const AgentRules = ({ rules }: AgentRulesProps) => {
  return (
    <div className="flex flex-col gap-2">
      {rules.map(rule => (
        <AgentRule key={rule.id} rule={rule}>
          <IconButton icon="trash" iconSize={22} />
          <IconButton icon="grip" iconSize={22} className="cursor-grab" />
        </AgentRule>
      ))}
    </div>
  )
}
