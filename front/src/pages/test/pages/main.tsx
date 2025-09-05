import { useSubtitle } from "@lib/layout-api/utils"
import { Heading } from "@ui/heading"
import type { ReactNode } from "react"

/**
 * Главная страница инструментов
 * @namespace Pages.Test.Main
 * @returns {ReactNode}
 */
export const Main = (): ReactNode => {
  useSubtitle("Главная")

  return (
    <div>
      <Heading>Test</Heading>
    </div>
  )
}
