import { resolve } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

// Эсорсишечка 🤗😊
const srcPath = resolve(import.meta.dirname, "./src")

// Уровень приложения
const appPath = resolve(srcPath, "app")

// Уровень общего кода
const sharedPath = resolve(srcPath, "shared")

// Публичные хосты приложения
const apiPublicHost: string = process.env.API_PUBLIC_HOST || "localhost"
const frontendPublicHost: string = process.env.FRONTEND_PUBLIC_HOST || "localhost"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [frontendPublicHost, apiPublicHost, "localhost", "127.0.0.1"]
  },
  resolve: {
    alias: {
      // FSD движуха
      "@app": appPath,
      "@pages": resolve(srcPath, "pages"),
      "@widgets": resolve(srcPath, "widgets"),
      "@features": resolve(srcPath, "features"),
      "@entities": resolve(srcPath, "entities"),
      "@shared": sharedPath,

      // Детализированные уровни shared (удобно жеже... ведь...? 😇)
      "@utils": resolve(sharedPath, "utils"),
      "@lib": resolve(sharedPath, "lib"),
      "@ui": resolve(sharedPath, "ui"),
      "@api": resolve(sharedPath, "api"),
      "@styles": resolve(sharedPath, "styles")
    }
  }
})
