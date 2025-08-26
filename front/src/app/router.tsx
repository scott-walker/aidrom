import { createBrowserRouter, Outlet } from "react-router"
import { PanelLayout } from "@layouts"
import { pageRegistry } from "@pages"

console.log("routes", pageRegistry.getRoutes())

/**
 * Маршрутизатор
 * @namespace App.Router
 */
export const router = createBrowserRouter([
  {
    element: (
      <PanelLayout>
        <Outlet />
      </PanelLayout>
    ),
    path: "/",
    children: pageRegistry.getRoutes()
  }
])
