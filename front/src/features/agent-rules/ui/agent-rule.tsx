import type { ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { type AgentRule as AgentRuleType } from "@entities/agent"

/**
 * Пропсы для компонента AgentRule
 * @namespace Features.AgentRules.Ui.AgentRule.Props
 */
type AgentRuleProps = {
  rule: AgentRuleType
  children?: ReactNode
  className?: string
}

/**
 * Компонент AgentRule
 * @namespace Features.AgentRules.Ui.AgentRule
 */
export const AgentRule = ({ rule, children, className = "" }: AgentRuleProps) => {
  const cardClasses = makeClasses(
    "flex",
    "items-center",
    "gap-2",
    "px-6",
    "py-4",
    "bg-background",
    "text-foreground-soft",
    "font-semibold",
    "rounded-lg",
    className
  )

  return (
    <div className={cardClasses}>
      <div>{rule.content}</div>
      <div className="ml-auto flex items-center gap-4">{children}</div>
    </div>
  )
}
