import { useEffect, useState } from "react"
import { ReactSortable, type SortableEvent } from "react-sortablejs"
import { ErrorBlock } from "@ui/error-block"
import { IconButton } from "@ui/icon-button"
import { useDeleteAgentRule, useSortAgentRules, type Agent as AgentType } from "@entities/agent"
import { AgentRule } from "./agent-rule"

/**
 * Пропсы для компонента AgentRules
 * @namespace Features.AgentRules.Ui.AgentRule.Props
 */
type AgentRulesProps = {
  agent: AgentType
}

/**
 * Компонент AgentRules
 * @namespace Features.AgentRules.Ui.AgentRule
 */
export const AgentRules = ({ agent }: AgentRulesProps) => {
  const [rules, setRules] = useState(agent.rules)
  const { mutate: deleteAgentRule, isPending, error } = useDeleteAgentRule()
  const { mutate: sortAgentRules, isPending: isSorting } = useSortAgentRules()

  useEffect(() => setRules(agent.rules), [agent.rules])

  const onDelete = (ruleId: number) => {
    deleteAgentRule({ ruleId })
  }
  const onSort = (evt: SortableEvent) => {
    requestAnimationFrame(() => {
      const sortableElement = evt.to
      const ruleIds = Array.from(sortableElement.children).map(item => {
        return parseInt(item.getAttribute("data-id") || "0")
      })

      sortAgentRules({ agentId: agent.id, ruleIds })
    })
  }

  if (error) return <ErrorBlock error={error} />
  if (rules.length === 0) return <div>Правил нет</div>

  return (
    <ReactSortable
      tag="div"
      list={rules}
      setList={setRules}
      handle=".sortable-handle"
      className="flex flex-col gap-2"
      onEnd={onSort}
    >
      {rules.map(rule => (
        <AgentRule key={rule.id} rule={rule}>
          <IconButton icon="trash" iconSize={22} onClick={() => onDelete(rule.id)} disabled={isPending} />
          <IconButton icon="grip" iconSize={22} className="cursor-grab sortable-handle" disabled={isSorting} />
        </AgentRule>
      ))}
    </ReactSortable>
  )
}
