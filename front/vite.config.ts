import { resolve } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

// Эсорсишечка 🤗😊
const srcPath = resolve(import.meta.dirname, "./src")

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
      "@": srcPath,
      "@utils": resolve(srcPath, "utils"),
      "@hooks": resolve(srcPath, "hooks"),
      "@components": resolve(srcPath, "components"),
      "@ui": resolve(srcPath, "ui"),
      "@layouts": resolve(srcPath, "layouts"),
      "@pages": resolve(srcPath, "pages")
    }
  }
})
