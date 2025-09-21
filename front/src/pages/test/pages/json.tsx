import type { ReactNode } from "react"
import { useLayoutSubtitle } from "@lib/layout-api"
import { Card } from "@ui/card"
import { Container } from "@ui/container"
import { Json as JsonUI } from "@ui/json"
import { Heading } from "@ui/heading"

/**
 * Страница с JSON
 * @namespace Pages.Test.Json
 * @returns {ReactNode}
 */
export const Json = (): ReactNode => {
  useLayoutSubtitle().setSubtitle("JSON")

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
            <JsonUI value={json} />
          </section>
          <section>
            <Heading>JSON interactive</Heading>
            <JsonUI value={json} interactive />
          </section>
          <section>
            <Heading>JSON editable</Heading>
            <JsonUI value={json} editable />
          </section>
        </Container>
      </Card.Body>
    </Card>
  )
}
