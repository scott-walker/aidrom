import { type ReactNode } from "react"
import { useLayoutSubtitle } from "@lib/layout-api"
import { Heading } from "@ui/heading"
import { Blocks } from "@ui/blocks"

/**
 * Страница настроек
 * @namespace Pages.Service.Settings
 * @returns {ReactNode}
 */
export const Settings = (): ReactNode => {
  useLayoutSubtitle().setSubtitle("Настройки")

  return (
    <Blocks>
      <Blocks.Row>
        <Blocks.Block>
          <Heading>Настройки сервиса</Heading>
        </Blocks.Block>
      </Blocks.Row>
    </Blocks>
  )
}
