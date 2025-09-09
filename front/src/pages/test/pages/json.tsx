import type { ReactNode } from "react"
import { useSubtitle } from "@lib/layout-api/utils"
import { Card } from "@ui/card"
import { Container } from "@ui/container"
import { Json as JsonUI } from "@ui/json"
import { Heading } from "@shared/ui/heading"

/**
 * Страница с Markdown
 * @namespace Pages.Test.Markdown
 * @returns {ReactNode}
 */
export const Json = (): ReactNode => {
  useSubtitle("Markdown")

  const json = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`

  return (
    <Card>
      <Card.Body>
        <Container className="flex flex-col gap-6">
          <section>
            <Heading>JSON</Heading>
            <JsonUI data={json} />
          </section>
          <section>
            <Heading>JSON interactive</Heading>
            <JsonUI data={json} interactive />
          </section>
          <section>
            <Heading>JSON editable</Heading>
            <JsonUI data={json} editable />
          </section>
        </Container>
      </Card.Body>
    </Card>
  )
}
