import { Outlet } from "react-router"
import { Heading } from "@ui/heading"

/**
 * Макет страницы
 * @namespace Pages.Dashboard.Layout
 */
export const DashboardLayout = () => {
  return (
    <>
      <Heading level={1}>Dashboard</Heading>
      <Outlet />
    </>
  )
}
