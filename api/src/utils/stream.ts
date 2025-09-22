/**
 * Обработка стрима
 * @namespace Utils.handleStream
 */
interface HandleStreamProps {
  onChunk: (chunk: any) => void
  onError: (error: Error) => void
}

/**
 * Обработка стрима
 * @namespace Utils.handleStream
 */
export const handleStream = async (stream: ReadableStream, { onChunk, onError }: HandleStreamProps) => {
  let buffer = ""

  for await (const chunk of stream) {
    // Преобразуем Buffer в строку
    const chunkStr = chunk.toString()
    buffer += chunkStr

    // Обрабатываем строки, разделенные двойными переносами строк
    const lines = buffer.split("\n\n")
    buffer = lines.pop() || "" // Оставляем неполную строку в буфере

    for (const line of lines) {
      if (line.trim() === "") continue

      if (line.startsWith("data: [DONE]")) {
        break // Конец стрима
      }

      if (line.startsWith("data: ")) {
        try {
          const jsonStr = line.slice(6) // Убираем "data: "
          const chunkData = JSON.parse(jsonStr)

          onChunk(chunkData)
        } catch (parseError) {
          onError(parseError)
        }
      }
    }
  }
}
