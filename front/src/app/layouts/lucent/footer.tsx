import type { ReactNode } from "react"
import { usePage } from "@lib/page-api"
import { HeaderVisibleTrigger } from "@shared/ui/HeaderVisibleTrigger"

/**
 * Футер макета
 * @namespace App.Layouts.Lucent.Footer
 * @returns {ReactNode}
 */
export const Footer = (): ReactNode => {
  const { getSlot } = usePage()
  const footer = getSlot("footer")

  return (
    <>
      <h1>FOOTER</h1>
      <HeaderVisibleTrigger />
      {footer}
    </>
  )
}
