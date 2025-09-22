import { type ReactNode } from "react"
import { useLayoutSubtitle } from "@lib/layout-api"
import { Heading } from "@ui/heading"
import { Blocks } from "@ui/blocks"

/**
 * Страница чатов
 * @namespace Pages.Service.Chats
 * @returns {ReactNode}
 */
export const Chats = (): ReactNode => {
  useLayoutSubtitle("Чаты")

  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block>
          <Heading>Чаты </Heading>
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
