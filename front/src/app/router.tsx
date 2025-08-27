import { createBrowserRouter, Outlet } from "react-router"
import { LucentLayout } from "@layouts"
import { pageRegistry } from "@pages"

/**
 * Маршрутизатор
 * @namespace App.Router
 */
export const router = createBrowserRouter([
  {
    element: (
      <LucentLayout>
        <Outlet />
      </LucentLayout>
    ),
    children: pageRegistry.getRoutes()
  }
])
