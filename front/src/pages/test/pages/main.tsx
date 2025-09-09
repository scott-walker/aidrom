import type { ReactNode } from "react"
import { useSubtitle } from "@lib/layout-api/utils"
import { Card } from "@ui/card"
import { Container } from "@ui/container"
import { Heading } from "@shared/ui/heading"

/**
 * Главная страница инструментов
 * @namespace Pages.Test.Main
 * @returns {ReactNode}
 */
export const Main = (): ReactNode => {
  useSubtitle("Главная")

  return (
    <Card>
      <Card.Body>
        <Container>
          <Heading>Разработка</Heading>
        </Container>
      </Card.Body>
    </Card>
  )
}
