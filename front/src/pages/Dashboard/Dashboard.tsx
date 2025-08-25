import type { FC, ReactNode } from "react"
import { Icon } from "@ui/Icon"

/**
 * Страница "Dashboard"
 * @namespace Pages.Dashboard
 * @returns {ReactNode}
 */
export const Dashboard: FC = (): ReactNode => {
  return (
    <div className="flex flex-col">
      <h1>Страница "Dashboard"</h1>
      <p className="text-2xl">Прямо сейчас ты находишься на главной странице</p>

      <div className="flex flex-col items-center justify-center mt-10 w-full bg-gradient-brand rounded-2xl p-20">
        <h1 className="text-primary-foreground font-family-display text-4xl">AIDrom Dashboard (version 0.1)</h1>
        <span className="text-lg text-secondary-foreground font-family-base w-1/2 text-center">
          Добро пожаловать в панель управления AIDrom! Здесь ты можешь управлять своими чатами, инструментами и
          настройками.
        </span>
        <div className="flex items-center gap-6 text-primary-foreground mt-10 p-6 bg-foreground/20 rounded-2xl">
          <Icon name="bot-message-square" size={48} />
          <Icon name="message-circle" size={48} />
          <Icon name="code" size={48} />
        </div>
      </div>
    </div>
  )
}
