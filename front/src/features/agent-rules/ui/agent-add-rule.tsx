import { useState } from "react"
import { makeClasses } from "@lib/style-api"
import { Button } from "@ui/button"
import { IconButton } from "@ui/icon-button"
import { Popover } from "@ui/popover"
import { Textarea } from "@ui/textarea"
import { ErrorBlock } from "@ui/error-block"

import { useAddAgentRule, type Agent as AgentType } from "@entities/agent"

import { useForm } from "../lib/use-form"
import { type AgentRulesForm } from "../model/form-schema"

/**
 * Пропсы для компонента AgentAddRule
 * @namespace Features.AgentRules.Ui.AgentAddRule.Props
 */
type AgentAddRuleProps = {
  agent: AgentType
  className?: string
}

/**
 * Компонент AgentAddRule
 * @namespace Features.AgentRules.Ui.AgentAddRule
 */
export const AgentAddRule = ({ agent, className = "" }: AgentAddRuleProps) => {
  const [open, setOpen] = useState(false)
  const { mutate: addAgentRule, isPending, error } = useAddAgentRule()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const cardClasses = makeClasses("flex", "items-center", "gap-2", className)
  const trigger = <IconButton schema="primary" circle icon="plus" iconSize={22} iconClassName="m-0.5" />

  const onSubmit = (data: AgentRulesForm) => {
    addAgentRule(
      { agentId: agent.id, data },
      {
        onSuccess: () => {
          setOpen(false)
          reset()
        }
      }
    )
  }

  if (error) return <ErrorBlock error={error} />

  return (
    <div className={cardClasses}>
      <Popover trigger={trigger} open={open} onOpenChange={setOpen}>
        <form className="flex flex-col items-center gap-3" onSubmit={handleSubmit(data => onSubmit(data))}>
          <Textarea
            {...register("content")}
            error={!!errors.content}
            placeholder="Добавить правило"
            className="min-w-132"
          />
          <Button schema="primary" className="w-fit" disabled={isPending}>
            Добавить
          </Button>
        </form>
      </Popover>
    </div>
  )
}
