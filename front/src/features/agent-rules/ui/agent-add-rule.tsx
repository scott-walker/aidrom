import { makeClasses } from "@lib/style-api"
import { IconButton } from "@shared/ui/icon-button"
import { Tooltip } from "@shared/ui/tooltip"

/**
 * Пропсы для компонента AgentAddRule
 * @namespace Features.AgentRules.Ui.AgentAddRule.Props
 */
type AgentAddRuleProps = {
  className?: string
}

/**
 * Компонент AgentAddRule
 * @namespace Features.AgentRules.Ui.AgentAddRule
 */
export const AgentAddRule = ({ className = "" }: AgentAddRuleProps) => {
  const cardClasses = makeClasses("flex", "items-center", "gap-2", className)

  return (
    <div className={cardClasses}>
      <Tooltip text="Добавить правило">
        <IconButton schema="primary" circle icon="plus" iconSize={22} iconClassName="m-0.5" />
      </Tooltip>
    </div>
  )
}
