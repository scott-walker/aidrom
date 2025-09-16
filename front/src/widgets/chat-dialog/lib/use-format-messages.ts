import { type Message } from "@entities/chat"

/**
 * Хук для форматирования сообщений
 * @namespace Widgets.Chat.Lib.UseFormatMessages
 */
export const useFormatMessages = (messages: Message[]) => {
  /**
   * Форматировать содержимое сообщения
   * @namespace Widgets.Chat.Lib.UseFormatMessages.FormatContent
   */
  const formatContent = (content: string) => {
    return content // content.replace(/\n/g, "<br />")
  }

  return {
    formattedMessages: messages.map(message => ({ ...message, content: formatContent(message.content) }))
  }
}
