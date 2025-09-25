import { Outlet, redirect } from "react-router"
import type { PageRoutes } from "@lib/page-api/types"
import { LoaderBlock } from "@ui/loader-block"
import { Layout } from "./layout"
// import { Providers } from "./pages/providers"
// import { Provider } from "./pages/provider"
// import { Requests } from "./pages/requests"
// import { Request } from "./pages/request"
// import { Chats } from "./pages/chats"
// import { Settings } from "./pages/settings"

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
  hydrateFallbackElement: <LoaderBlock />,
  children: [
    {
      index: true,
      loader: () => redirect("/service/providers")
    },
    {
      path: "providers",
      lazy: async () => {
        const { Providers } = await import("./pages/providers")

        return { element: <Providers /> }
      }
    },
    {
      path: "providers/:providerId",
      lazy: async () => {
        const { Provider } = await import("./pages/provider")

        return { element: <Provider /> }
      }
    },
    {
      path: "requests",
      lazy: async () => {
        const { Requests } = await import("./pages/requests")

        return { element: <Requests /> }
      }
    },
    {
      path: "requests/:requestId",
      lazy: async () => {
        const { Request } = await import("./pages/request")

        return { element: <Request /> }
      }
    },
    {
      path: "chats",
      lazy: async () => {
        const { Chats } = await import("./pages/chats")

        return { element: <Chats /> }
      }
    },
    {
      path: "settings",
      lazy: async () => {
        const { Settings } = await import("./pages/settings")

        return { element: <Settings /> }
      }
    }
  ]
}
