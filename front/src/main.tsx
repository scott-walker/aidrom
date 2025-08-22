import "@assets"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"

const root = document.getElementById("root")!
const app = createRoot(root!)

app.render(
  <StrictMode>
    <App />
  </StrictMode>
)
