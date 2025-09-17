import { useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"

import { IconButton } from "@ui/icon-button"
import { type Agent as AgentType, type AgentRule as AgentRuleType } from "@entities/agent"

import { AgentRule } from "./agent-rule"
import { useDeleteRule } from "../lib/use-delete"
import { useSortRules } from "../lib/use-sort"

/**
 * Пропсы для компонента AgentRules
 * @namespace Features.AgentRules.Ui.AgentRule.Props
 */
type AgentRulesProps = {
  agentId: AgentType["id"]
  rules: AgentRuleType[]
}

/**
 * Компонент AgentRules
 * @namespace Features.AgentRules.Ui.AgentRule
 */
export const AgentRules = ({ agentId, rules }: AgentRulesProps) => {
  const [innerRules, setInnerRules] = useState<AgentRuleType[]>(rules)
  const { onDelete, isDeleting } = useDeleteRule(agentId)
  const { onSort, isSorting } = useSortRules(agentId)

  // Для обновления списка правил при изменении коллекции правил в схеме агента
  useEffect(() => setInnerRules(rules), [rules])

  if (!innerRules.length) return <div>Правил нет</div>

  return (
    <ReactSortable
      tag="div"
      list={innerRules}
      setList={setInnerRules}
      handle=".sortable-handle"
      className="flex flex-col gap-2"
      onEnd={onSort}
    >
      {innerRules.map(rule => (
        <AgentRule key={rule.id} {...rule}>
          <IconButton icon="trash" iconSize={22} onClick={() => onDelete(rule.id)} disabled={isDeleting} />
          <IconButton icon="grip" iconSize={22} className="cursor-grab sortable-handle" disabled={isSorting} />
        </AgentRule>
      ))}
    </ReactSortable>
  )
}
