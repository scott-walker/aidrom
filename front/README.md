### Создать проект Vue

```sh
npm create vite@latest
```


### Установить Sass

```sh
npm i -D sass
```


### Настроить vite.config.js

```js
import { URL, fileURLToPath } from "url"
import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// const __filename = fileURLToPath(import.meta.url)
const __dirname = fileURLToPath(new URL(".", import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: [".js", ".json", ".vue"],
    alias: {
      "@": resolve(__dirname, "src")
    }
  }

  // Sass
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/styles/variables.scss";`
  //     }
  //   }
  // }
})
```


### Установить Prettier

```sh
npm i -D prettier
```

### Создать конфиг для Prettier

```sh
touch .prettierrc
```

```json
{
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 140,
  "trailingComma": "none"
}
```

### Создать правило игнора для Prettier

```sh
touch .prettierignore
```

```
node_modules
dist
```

### Добавить Prettier скрипт в package.json

```json
{
  "scripts": {
    "check": "prettier --check ."
  }
}
```


### Устновить линтер Eslint

```sh
npm i -D eslint eslint-plugin-vue @vue/eslint-config-prettier
```

### Создать конфиг для Eslint

```sh
touch eslint.config.js
```

```js
import vue from "eslint-plugin-vue"
import js from "@eslint/js"
import prettier from "@vue/eslint-config-prettier"

export default [
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  prettier,
  {
    files: ["**/*.vue", "**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/require-default-prop": "off"
    }
  }
]
```

### Добавить Eslint скрипт в package.json

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```


### Настроить VSCode

```sh
touch .vscode/settings.json
```

```json
{
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
