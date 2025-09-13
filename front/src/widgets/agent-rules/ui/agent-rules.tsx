import { AgentAddRule, AgentRules as AgentRulesList } from "@features/agent-rules"
import { type AgentRule as AgentRuleType } from "@entities/agent"
import { Card } from "@shared/ui/card"
import { Heading } from "@shared/ui/heading"

/**
 * Пропсы для компонента правил агента
 * @namespace Widgets.AgentRules.Ui.AgentRules.Props
 */
type AgentRulesProps = {
  rules: AgentRuleType[]
}

/**
 * Компонент правил агента
 * @namespace Widgets.AgentRules.Ui.AgentRules
 */
export const AgentRules = ({ rules }: AgentRulesProps) => {
  return (
    <Card>
      <Card.Header className="gap-4">
        <Heading>Правила</Heading>
        <AgentAddRule />
      </Card.Header>
      <Card.Body>
        <AgentRulesList rules={rules} />
      </Card.Body>
    </Card>
  )
}
