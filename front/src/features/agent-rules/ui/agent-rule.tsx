import { type ReactNode } from "react"
import { makeClasses } from "@lib/style-api"
import { type AgentRule as AgentRuleType } from "@entities/agent"

/**
 * Пропсы для компонента AgentRule
 * @namespace Features.AgentRules.Ui.AgentRule.Props
 */
type AgentRuleProps = {
  id: AgentRuleType["id"]
  priority: AgentRuleType["priority"]
  content: AgentRuleType["content"]
  children?: ReactNode
  className?: string
}

/**
 * Компонент AgentRule
 * @namespace Features.AgentRules.Ui.AgentRule
 */
export const AgentRule = ({ id, priority, content, children, className = "" }: AgentRuleProps) => {
  const cardClasses = makeClasses(
    "flex",
    "items-center",
    "gap-6",
    "px-6",
    "py-4",
    "bg-background",
    "text-foreground-soft",
    "font-semibold",
    "rounded-lg",
    className
  )
  const priorityClasses = makeClasses(
    "shrink-0",
    "flex",
    "items-center",
    "justify-center",
    "w-10",
    "h-10",
    "text-lg",
    "font-mega-bold",
    "rounded-full",
    "border-2",
    "border-foreground-soft/30",
    "text-foreground-soft/70"
  )

  return (
    <div className={cardClasses} data-id={id}>
      <div className={priorityClasses}>{priority + 1}</div>
      <div>{content}</div>
      <div className="ml-auto flex items-center gap-4">{children}</div>
    </div>
  )
}
