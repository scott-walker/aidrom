// Базовый URL API
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "")

/**
 * Пропсы компонента для отображения изображения
 * @namespace Shared.UI.DeepSeekMarkdown.Image.Props
 */
type Props = {
  src: string
  alt: string
}

/**
 * Компонент для отображения изображения
 * @namespace Shared.UI.DeepSeekMarkdown.Image
 */
export const Image = ({ src, alt }: Props) => {
  if (!src.startsWith("https://")) {
    src = src.replace(/^\//, "")
    src = src.startsWith(API_BASE_URL) ? src : `${API_BASE_URL}/${src}`
  }

  return <img src={src} alt={alt} className="mb-4 border-3 border-primary rounded-2xl w-full max-w-[300px]" />
}
