import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { AppProvider } from "./app/provider"

// App
import "@styles"
import { router } from "@app"

const root = document.getElementById("root")
const app = createRoot(root!)

app.render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
)
