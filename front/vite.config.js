import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: [".js", ".json", ".vue"],
    alias: {
      "@": resolve(import.meta.dirname, "src")
    }
  }

  // Split by chunks
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         vue: ["vue", "vue-router", "pinia"],
  //         vendors: ["lodash", "axios"]
  //       }
  //     }
  //   }
  // }

  // Sass
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/styles/variables.scss";`
  //     }
  //   }
  // }
})
