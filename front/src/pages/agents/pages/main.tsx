import type { ReactNode } from "react"
import { Blocks } from "@ui/blocks"

import { AgentList } from "@widgets/agent-list"
import { AgentCreateForm } from "@features/agent-form"
import { Card } from "@shared/ui/card"
import { Heading } from "@shared/ui/heading"

/**
 * Главная страница
 * @namespace Pages.Agents.Main
 */
export const Main = (): ReactNode => {
  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block className="w-4/6">
          <AgentList />
        </Blocks.Block>
        <Blocks.Block className="w-2/6">
          <Card>
            <Card.Header>
              <Heading>Создание агента</Heading>
            </Card.Header>
            <Card.Body>
              <AgentCreateForm />
            </Card.Body>
          </Card>
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
