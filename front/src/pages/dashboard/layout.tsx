import { type PageLayoutProps } from "@lib/page-api"
import { Heading } from "@shared/ui/heading"

/**
 * Макет страницы
 * @namespace Pages.Dashboard.Layout
 */
export const DashboardLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <Heading level={1}>Dashboard</Heading>
      {children}
    </>
  )
}
