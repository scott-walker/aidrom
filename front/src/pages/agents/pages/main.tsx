import type { ReactNode } from "react"
import { Blocks } from "@ui/blocks"

import { AgentCreate } from "@widgets/agent-create"
import { AgentList } from "@widgets/agent-list"

/**
 * Главная страница
 * @namespace Pages.Agents.Main
 */
export const Main = (): ReactNode => {
  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block className="w-full">
          <AgentCreate />
        </Blocks.Block>
      </Blocks.Row>

      <Blocks.Row>
        <Blocks.Block className="w-full">
          <AgentList />
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
