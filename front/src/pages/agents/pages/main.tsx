import type { ReactNode } from "react"
import { AgentList } from "@widgets/agent-list"
import { Blocks } from "@shared/ui/blocks"
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
        <Blocks.Block className="w-4/12 p-6">
          <AgentList />
        </Blocks.Block>

        <Blocks.Block className="w-8/12 p-6">
          <Card>
            <Card.Header>
              <Heading>Информация</Heading>
            </Card.Header>
            <Card.Body>
              <Card.Section>123</Card.Section>
            </Card.Body>
          </Card>
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
