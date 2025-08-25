import { createBrowserRouter, Outlet } from "react-router"
import { Dashboard } from "./Dashboard"
import { Chats } from "./Chats"
import { Tools } from "./Tools"
import { Error } from "./Error"
import { Layout } from "@layouts"
import { Layout as TestLayout, Typography, Components } from "./Test"

export const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/chats",
        element: <Chats />
      },
      {
        path: "/tools",
        element: <Tools />
      },
      {
        path: "/test",
        element: <TestLayout />,
        children: [
          {
            index: true,
            loader: () => ({
              title: "Компоненты"
            }),
            element: <Components />
          },
          {
            path: "typography",
            loader: () => ({
              title: "Типографика"
            }),
            element: <Typography />
          }
        ]
      },
      {
        path: "*",
        element: <Error />
      }
    ]
  }
])
