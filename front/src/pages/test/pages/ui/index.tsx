import type { ReactNode } from "react"
import { createPage, type PageConfig } from "@lib/page-api"
import { Code } from "@ui/code"
import { Button } from "@ui/button"
import { Brand } from "@ui/brand"
import { Heading } from "@ui/heading"
import { IconButton } from "@ui/icon-button"

/**
 * Конфигурация страницы
 */
const config: PageConfig = {
  meta: {
    title: "UI"
  }
}

/**
 * Страница тестирования UI
 */
export const UiPage = createPage(config, (): ReactNode => {
  return (
    <div className="flex flex-col">
      <p className="text-2xl text-foreground font-family-base">
        Прямо сейчас ты находишься на странице тестирования компонентов
      </p>

      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>

      <Code accent className="mt-10">
        console.log("Hello, world!")
      </Code>

      <div className="flex flex-col gap-4 mt-10">
        <div className="flex items-center gap-4 flex-wrap">
          <Button schema="soft">Soft</Button>
          <Button schema="hard">Hard</Button>
          <Button schema="primary">Primary</Button>
          <Button schema="outline">Outline</Button>
          <Button schema="brand">Brand</Button>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <IconButton icon="home" schema="ghost" />
          <IconButton icon="home" schema="hard" />
          <IconButton icon="home" schema="primary" />
          <IconButton icon="home" schema="outline" />
          <IconButton icon="home" schema="brand" />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <IconButton icon="home" schema="ghost" circle />
          <IconButton icon="home" schema="hard" circle />
          <IconButton icon="home" schema="primary" circle />
          <IconButton icon="home" schema="outline" circle />
          <IconButton icon="home" schema="brand" circle />
        </div>
      </div>

      <div className="flex justify-between mt-10 flex-wrap">
        {/* <InfobarTrigger /> */}

        <div className="flex flex-col gap-4 flex-wrap">
          <Brand size="sm" />
          <Brand size="md" />
          <Brand size="lg" />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-10 w-full flex-wrap">
        <div className="p-10 w-50 bg-background-soft text-pink-500 font-bold">Background Soft</div>
        <div className="p-10 w-50 bg-background text-pink-500 font-bold">Background</div>
        <div className="p-10 w-50 bg-background-hard text-pink-500 font-bold">Background Hard</div>
      </div>

      <div className="flex justify-end gap-4 mt-10 w-full flex-wrap">
        <div className="p-10 w-50 bg-foreground-soft text-pink-500 font-bold">Foreground Soft</div>
        <div className="p-10 w-50 bg-foreground text-pink-500 font-bold">Foreground</div>
        <div className="p-10 w-50 bg-foreground-hard text-pink-500 font-bold">Foreground Hard</div>
      </div>

      <div className="mt-10 w-full h-40 bg-brand-gradient rounded-2xl" />
    </div>
  )
})
