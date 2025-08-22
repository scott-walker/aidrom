import type { FC, ReactNode } from "react"
import { Code } from "@ui/Code"
import { Button } from "@ui/Button"
import { Brand } from "@components/Brand"
import { InfobarTrigger } from "@layouts/Lucent/InfobarTrigger"

/**
 * Главная страница
 * @namespace Pages.Dashboard
 * @returns {ReactNode}
 */
export const Dashboard: FC = (): ReactNode => {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl font-bold text-foreground-closer font-family-display">Страница "Dashboard"</h1>
      <p className="text-2xl text-foreground font-family-base">Прямо сейчас ты находишься на главной странице</p>
      <Code accent className="mt-10">
        console.log("Hello, world!")
      </Code>

      <div className="flex gap-4 mt-10">
        <Button variant="default">Default</Button>
        <Button variant="brand">Brand</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <div className="flex justify-between mt-10">
        <InfobarTrigger />

        <div className="flex flex-col gap-4">
          <Brand size="sm" />
          <Brand size="md" />
          <Brand size="lg" />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-10 w-full">
        <div className="p-10 w-50 bg-background-closer text-pink-500">Background Closer</div>
        <div className="p-10 w-50 bg-background text-pink-500">Background</div>
        <div className="p-10 w-50 bg-background-farther text-pink-500">Background Further</div>
      </div>

      <div className="flex justify-end gap-4 mt-10 w-full">
        <div className="p-10 w-50 bg-foreground-closer text-pink-500">Foreground Closer</div>
        <div className="p-10 w-50 bg-foreground text-pink-500">Foreground</div>
        <div className="p-10 w-50 bg-foreground-farther text-pink-500">Foreground Further</div>
      </div>

      {/* <div className="flex justify-end gap-4 mt-10 w-full">
        {genBgColors(40, ["foreground-closer", "foreground", "foreground-farther"])}
      </div> */}

      <div className="mt-10 w-full h-40 bg-gradient-brand rounded-2xl" />
    </div>
  )
}
