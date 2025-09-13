import { ErrorBlock } from "@ui/error-block"
import { IconButton } from "@ui/icon-button"
import { useDeleteAgentRule, type AgentRule as AgentRuleType } from "@entities/agent"
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
  const { mutate: deleteAgentRule, isPending, error } = useDeleteAgentRule()
  const onDelete = (ruleId: number) => {
    deleteAgentRule({ ruleId })
  }

  if (error) return <ErrorBlock error={error} />

  return (
    <div className="flex flex-col gap-2">
      {rules.map(rule => (
        <AgentRule key={rule.id} rule={rule}>
          <IconButton icon="trash" iconSize={22} onClick={() => onDelete(rule.id)} disabled={isPending} />
          <IconButton icon="grip" iconSize={22} className="cursor-grab" />
        </AgentRule>
      ))}
    </div>
  )
}
