import { mergeClasses } from "@utils/jsxtools"

/**
 * Классы для основного контейнера чата
 * @namespace Chat.Assets.ChatClasses
 * @type {string}
 */
export const chatClasses: string = mergeClasses("flex", "flex-col", "h-full", "bg-background", "border", "rounded-lg")

/**
 * Классы для заголовка чата
 * @namespace Chat.Assets.ChatHeaderClasses
 * @type {string}
 */
export const chatHeaderClasses: string = mergeClasses(
  "flex",
  "items-center",
  "justify-between",
  "p-4",
  "border-b",
  "bg-muted/50"
)

/**
 * Классы для области сообщений
 * @namespace Chat.Assets.ChatMessagesClasses
 * @type {string}
 */
export const chatMessagesClasses: string = mergeClasses("flex-1", "overflow-y-auto", "p-4", "space-y-4")

/**
 * Классы для области ввода
 * @namespace Chat.Assets.ChatInputClasses
 * @type {string}
 */
export const chatInputClasses: string = mergeClasses("p-4", "border-t", "bg-muted/30")

/**
 * Классы для сообщения пользователя
 * @namespace Chat.Assets.UserMessageClasses
 * @type {string}
 */
export const userMessageClasses: string = mergeClasses("flex", "justify-end", "gap-2")

/**
 * Классы для сообщения ассистента
 * @namespace Chat.Assets.AssistantMessageClasses
 * @type {string}
 */
export const assistantMessageClasses: string = mergeClasses("flex", "justify-start", "gap-2")

/**
 * Классы для контента сообщения пользователя
 * @namespace Chat.Assets.UserMessageContentClasses
 * @type {string}
 */
export const userMessageContentClasses: string = mergeClasses(
  "bg-primary",
  "text-primary-foreground",
  "rounded-lg",
  "px-4",
  "py-2",
  "max-w-[80%]",
  "break-words"
)

/**
 * Классы для контента сообщения ассистента
 * @namespace Chat.Assets.AssistantMessageContentClasses
 * @type {string}
 */
export const assistantMessageContentClasses: string = mergeClasses(
  "bg-muted",
  "text-foreground",
  "rounded-lg",
  "px-4",
  "py-2",
  "max-w-[80%]",
  "break-words"
)

/**
 * Классы для времени сообщения
 * @namespace Chat.Assets.MessageTimeClasses
 * @type {string}
 */
export const messageTimeClasses: string = mergeClasses("text-xs", "text-muted-foreground", "mt-1")
