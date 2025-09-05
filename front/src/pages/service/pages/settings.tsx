import { type ReactNode } from "react"
import { Heading } from "@ui/heading"
import { Blocks } from "@shared/ui/blocks"
import { useSubtitle } from "@lib/layout-api/utils"

/**
 * Страница настроек
 * @namespace Pages.Service.Settings
 * @returns {ReactNode}
 */
export const Settings = (): ReactNode => {
  useSubtitle("Настройки")

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
