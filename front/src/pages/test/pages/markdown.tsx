import type { ReactNode } from "react"
import { useSubtitle } from "@lib/layout-api/utils"
import { Card } from "@ui/card"
import { Container } from "@ui/container"
import { Markdown as MarkdownUI } from "@ui/Markdown"

/**
 * Страница с Markdown
 * @namespace Pages.Test.Markdown
 * @returns {ReactNode}
 */
export const Markdown = (): ReactNode => {
  useSubtitle("Markdown")

  const markdown = `
  ## FSD-архитектура

  **Dependencies**
  1. Нет кросс-импортов
  2. Односторонняя связь
  3. \`shared/\` — общий для всех, но ни от кого не зависит

  **Rules**
  1. Вниз → Вверх: \`pages\` → \`widgets\` → \`features\` → \`entities\` → \`shared\`
  2. Фичи не импортируют друг друга

  ## Инструменты
  \`\`\`
  npx create-t3-app@latest
  npx create-next-app@latest
  npx create-react-app@latest
  npx create-react-native-app@latest
  npx create-react-native-app@latest
  \`\`\`
  
  ## Фреймворки
  - React
  - Next.js
  - Remix
  - Vite

  ### Ссылки
  - [React](https://react.dev/)
  - [Next.js](https://nextjs.org/)
  - [Remix](https://remix.run/)
  - [Vite](https://vite.dev/)

  #### Дополнительные инструменты
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Styled Components](https://styled-components.com/)
  - [Emotion](https://emotion.sh/)
  - [CSS Modules](https://github.com/css-modules/css-modules)
  - [SASS](https://sass-lang.com/)
  - [LESS](https://lesscss.org/)

  ##### Текст
  Тут должен быть текст и он должен быть красивым и удобным для чтения. Этот текст должен быть написан на русском языке. Еще он очень важен и его нужно обязательно прочитать.
  
  # Заголовок 1 уровня
  ## Заголовок 2 уровня
  ### Заголовок 3 уровня
  #### Заголовок 4 уровня
  ##### Заголовок 5 уровня
  ###### Заголовок 6 уровня
  
  \`\`\`js
  const a = 1
  const b = 2
  const c = a + b
  \`\`\`
  `

  return (
    <Card>
      <Card.Body>
        <Container>
          <MarkdownUI>{markdown}</MarkdownUI>
        </Container>
      </Card.Body>
    </Card>
  )
}
