import type { ReactNode } from "react"
import { useSubtitle } from "@lib/layout-api/utils"
import { Card } from "@ui/card"
import { Container } from "@ui/container"
import { Markdown as MarkdownUI } from "@ui/markdown"

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

  ---
  ##### Текст
  Тут должен быть текст и он должен быть красивым и удобным для чтения. Этот текст должен быть написан на русском языке. Еще он очень важен и его нужно обязательно прочитать.


  **Rules**
  1. Вниз → Вверх: \`pages\` → \`widgets\` → \`features\` → \`entities\` → \`shared\`
  2. Фичи не импортируют друг друга

  ## Инструменты
  \`\`\`
  npx create-t3-app@latest
  npx create-next-app@latest
  npx create-react-app@latest
  \`\`\`

  #### Дополнительные инструменты
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Styled Components](https://styled-components.com/)
  - [Emotion](https://emotion.sh/)
  - [CSS Modules](https://github.com/css-modules/css-modules)
  - [SASS](https://sass-lang.com/)
  - [LESS](https://lesscss.org/)

    `

  return (
    <div className="flex flex-col gap-10">
      <Card>
        <Card.Body>
          <Container>
            <MarkdownUI>{markdown}</MarkdownUI>
          </Container>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Container>
            <MarkdownUI editable>{markdown}</MarkdownUI>
          </Container>
        </Card.Body>
      </Card>
    </div>
  )
}
