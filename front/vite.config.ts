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
      // App
      "@app": appPath,
      "@assets": resolve(appPath, "assets"),
      "@layouts": resolve(appPath, "layouts"),

      // Components
      "@components": resolve(srcPath, "components"),

      // Pages
      "@pages": resolve(srcPath, "pages"),

      // Shared
      "@shared": sharedPath,
      "@utils": resolve(sharedPath, "utils"),
      "@hooks": resolve(sharedPath, "hooks"),
      "@lib": resolve(sharedPath, "lib"),
      "@ui": resolve(sharedPath, "ui"),

      // Packages
      "@packages": resolve(srcPath, "packages")
    }
  }
})
