import { useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"

import { IconButton } from "@ui/icon-button"
import { type Agent as AgentType } from "@entities/agent"

import { AgentRule } from "./agent-rule"
import { useDeleteRule } from "../lib/use-delete"
import { useSortRules } from "../lib/use-sort"

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
  const { onDelete, isDeleting } = useDeleteRule(agent.id)
  const { onSort, isSorting } = useSortRules(agent.id)

  // Для обновления списка правил при изменении коллекции правил в схеме агента
  useEffect(() => setRules(agent.rules), [agent.rules])

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
          <IconButton icon="trash" iconSize={22} onClick={() => onDelete(rule.id)} disabled={isDeleting} />
          <IconButton icon="grip" iconSize={22} className="cursor-grab sortable-handle" disabled={isSorting} />
        </AgentRule>
      ))}
    </ReactSortable>
  )
}
