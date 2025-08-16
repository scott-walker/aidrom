import { resolve} from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"

const srcPath = resolve(import.meta.dirname, "./src")

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": srcPath,
      "@utils": resolve(srcPath, "utils"),
      "@hooks": resolve(srcPath, "hooks"),
      "@components": resolve(srcPath, "components"),
      "@ui": resolve(srcPath, "components/ui"),
      "@layouts": resolve(srcPath, "layouts"),
      "@pages": resolve(srcPath, "pages")
    }
  }
})
