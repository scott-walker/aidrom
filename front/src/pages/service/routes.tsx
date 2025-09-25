import { Outlet, redirect } from "react-router"
import type { PageRoutes } from "@lib/page-api/types"
import { Layout } from "./layout"
import { Providers } from "./pages/providers"
import { Provider } from "./pages/provider"
import { Requests } from "./pages/requests"
import { Request } from "./pages/request"
import { Chats } from "./pages/chats"
import { Settings } from "./pages/settings"

/**
 * Маршруты
 * @namespace Pages.Service.Routes
 */
export const routes: PageRoutes = {
  element: (
    <Layout>
      <Outlet />
    </Layout>
  ),
  path: "service",
  children: [
    {
      index: true,
      loader: () => redirect("/service/providers")
    },
    {
      path: "providers",
      element: <Providers />
    },
    {
      path: "providers/:providerId",
      element: <Provider />
    },
    {
      path: "requests",
      element: <Requests />
    },
    {
      path: "requests/:requestId",
      element: <Request />
    },
    {
      path: "chats",
      element: <Chats />
    },
    {
      path: "settings",
      element: <Settings />
    }
  ]
}
