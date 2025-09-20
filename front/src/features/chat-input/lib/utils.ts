import { SSEDataType } from "@entities/chat"

/**
 * Формат данных SSE chunk
 * @namespace Features.Chat.SendMessage.Lib.Utils.SSEDataChunk
 */
export interface SSEDataChunk {
  type: SSEDataType.Chunk
  content: string
}

/**
 * Формат данных SSE end
 * @namespace Features.Chat.SendMessage.Lib.Utils.SSEDataEnd
 */
export interface SSEDataEnd {
  type: SSEDataType.End
  data: {
    id: number
    chatId: number
    requestId: number
    clientMessage: string
    agentMessage: string
    createdAt: string
    updatedAt: string
  }
}

/**
 * Формат данных SSE error
 * @namespace Features.Chat.SendMessage.Lib.Utils.SSEDataError
 */
export interface SSEDataError {
  type: SSEDataType.Error
  message: string
}

/**
 * Пропсы для создания потока SSE
 * @namespace Features.Chat.SendMessage.Lib.Utils.CreateStreamProps
 */
export interface CreateStreamProps {
  onOpen?: () => void
  onStart?: () => void
  onChunk?: (data: SSEDataChunk) => void
  onEnd?: (data: SSEDataEnd) => void
  onError?: (data: SSEDataError) => void
  onClose?: () => void
}

/**
 * Создать поток SSE
 * @namespace Features.Chat.SendMessage.Lib.Utils.createStream
 */
export const createStream = (
  chatId: number,
  { onOpen, onStart, onChunk, onEnd, onError, onClose }: CreateStreamProps
) => {
  const stream = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/chats/${chatId}/stream`)
  let isFirstChunk = true

  stream.onopen = onOpen ?? (() => {})
  stream.close = onClose ?? (() => {})
  stream.onerror = () => {
    onError?.({
      type: SSEDataType.Error,
      message: "Ошибка при отправке потока"
    })
  }
  stream.onmessage = event => {
    const data = JSON.parse(event.data)

    // if (data.type === SSEDataType.Start) {
    //   onStart?.()
    // }
    if (data.type === SSEDataType.Chunk) {
      if (isFirstChunk) {
        isFirstChunk = false
        onStart?.()
      }
      onChunk?.(data)
    } else if (data.type === SSEDataType.End) {
      onEnd?.(data)
      isFirstChunk = true
    } else if (data.type === SSEDataType.Error) {
      onError?.(data)
      isFirstChunk = true
    }
  }

  return stream
}
