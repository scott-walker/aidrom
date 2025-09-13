import { AgentAddRule, AgentRules as AgentRulesList } from "@features/agent-rules"
import { type Agent as AgentType } from "@entities/agent"
import { Card } from "@shared/ui/card"
import { Heading } from "@shared/ui/heading"

/**
 * Пропсы для компонента правил агента
 * @namespace Widgets.AgentRules.Ui.AgentRules.Props
 */
type AgentRulesProps = {
  agent: AgentType
}

/**
 * Компонент правил агента
 * @namespace Widgets.AgentRules.Ui.AgentRules
 */
export const AgentRules = ({ agent }: AgentRulesProps) => {
  return (
    <Card>
      <Card.Header className="gap-4">
        <Heading>Правила</Heading>
        <AgentAddRule agent={agent as AgentType} />
      </Card.Header>
      <Card.Body>
        <AgentRulesList agent={agent as AgentType} />
      </Card.Body>
    </Card>
  )
}
