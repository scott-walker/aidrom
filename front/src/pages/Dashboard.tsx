import type { FC, ReactNode } from "react"
import { Code } from "@ui/Code"
import { Brand } from "@components/Brand"
import { InfobarTrigger } from "@/layouts/Lucent/InfobarTrigger"

/**
 * Главная страница
 * @namespace Pages.Dashboard
 * @returns {ReactNode}
 */
export const Dashboard: FC = (): ReactNode => {
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-5xl font-bold text-foreground-accent font-family-display">Страница "Dashboard"</h1>
      <p className="text-2xl text-foreground font-family-base">Прямо сейчас ты находишься на главной странице</p>
      {/* <p className="text-2xl text-foreground-accent font-family-base">Прямо сейчас ты находишься на главной странице</p> */}
      <Code className="mt-10">console.log("Hello, world!")</Code>

      <div className="flex justify-between mt-10">
        <InfobarTrigger />

        <div className="flex flex-col gap-4">
          <Brand size="sm" />
          <Brand size="md" />
          <Brand size="lg" />
        </div>
      </div>
    </div>
  )
}
