import type { ReactNode } from "react"
import { Blocks } from "@ui/blocks"
// import { Card } from "@ui/card"
// import { Heading } from "@ui/heading"

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
        <Blocks.Block className="w-1/2">
          <AgentList />
        </Blocks.Block>
        {/* 
        <Blocks.Block className="w-1/2">
          <Card>
            <Card.Header>
              <Heading>Информация</Heading>
            </Card.Header>
            <Card.Body>
              <Card.Section>123</Card.Section>
            </Card.Body>
          </Card>
        </Blocks.Block> */}
      </Blocks.Row>
    </Blocks>
  )
}
