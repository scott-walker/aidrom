import "@assets"

// React
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

// Router
import { RouterProvider } from "react-router"

// App
import { router } from "@pages"

const root = document.getElementById("root")
const app = createRoot(root!)

app.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
