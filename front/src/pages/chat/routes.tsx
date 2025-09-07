import { Outlet } from "react-router"
import type { PageRoutes } from "@lib/page-api/types"
import { Layout } from "./layout"
import { Main } from "./pages/main"
import { Chat } from "./pages/chat"

/**
 * Маршруты
 * @namespace Pages.Chat.Routes
 */
export const routes: PageRoutes = {
  element: (
    <Layout>
      <Outlet />
    </Layout>
  ),
  path: "chat",
  children: [
    {
      index: true,
      element: <Main />
    },
    {
      path: ":chatId",
      element: <Chat />
    }
  ]
}
