import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import "highlight.js/styles/github.min.css"

/**
 * Пропсы компонента для отображения Markdown
 * @namespace Shared.UI.DeepSeekMarkdown.Props
 */
type Props = {
  content: string
  html?: boolean
}

/**
 * Компонент для отображения Markdown
 * @namespace Shared.UI.DeepSeekMarkdown
 */
export const DeepSeekMarkdown = ({ content, html = false }: Props) => {
  let rehypePlugins

  if (html) {
    rehypePlugins = [rehypeRaw, rehypeSanitize, rehypeHighlight]
  } else {
    rehypePlugins = [rehypeHighlight]
  }

  return (
    <div className="typography-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // поддержка GitHub Flavored Markdown
        rehypePlugins={rehypePlugins} // подсветка синтаксиса
        components={
          {
            pre: ({ children }) => <div className="code-wrapper">{children}</div>,

            img: ({ src, alt }) => {
              return (
                <img src={src} alt={alt} className="mb-4 border-3 border-primary rounded-2xl max-w-1/2 max-h-1/2" />
              )
            },

            // Кастомизация компонентов
            code({ className, children, ...props }) {
              const inline = "inline" in props ? props.inline : false
              const match = /language-(\w+)/.exec(className || "")
              const language = match ? match[1] : ""

              return !inline ? (
                <div className="code-block">
                  {language && <div className="code-block__language">{language}</div>}

                  <pre className={className}>
                    <code {...props}>{children}</code>
                  </pre>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }

            // Стилизация других элементов
            // h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
            // h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
            // p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
            // table: ({ children }) => (
            //   <div className="overflow-x-auto">
            //     <table className="min-w-full border-collapse">{children}</table>
            //   </div>
            // )
          } as Components
        }
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
