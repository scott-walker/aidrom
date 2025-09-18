import ReactMarkdown, { type Components } from "react-markdown"

// GitHub Flavored Markdown
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import "highlight.js/styles/github.min.css"

import { Image } from "./elements/image"
import { Pre } from "./elements/pre"
import { Code } from "./elements/code"
import { Heading } from "./elements/heading"
import { Paragraph } from "./elements/paragraph"

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
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={rehypePlugins}
        components={
          {
            pre: Pre,
            img: Image,
            code: Code,
            h1: ({ children }) => <h1 className="mb-4 text-4xl font-bold">{children}</h1>,
            h2: ({ children }) => <h2 className="mb-4 text-3xl font-bold">{children}</h2>,
            h3: ({ children }) => <h3 className="mb-4 text-2xl font-bold">{children}</h3>,
            h4: ({ children }) => <h4 className="mb-4 text-xl font-bold">{children}</h4>,
            h5: ({ children }) => <h5 className="mb-4 text-lg font-bold">{children}</h5>,
            h6: ({ children }) => <h6 className="mb-4 text-base font-bold">{children}</h6>,
            p: ({ children }) => <p className="mb-4 text-base leading-relaxed">{children}</p>,
            ol: ({ children }) => <ol className="pl-8 list-decimal list-outside">{children}</ol>,
            ul: ({ children }) => <ul className="pl-8 list-disc list-inside">{children}</ul>,
            li: ({ children }) => <li className="mb-2">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="pl-4 pr-4 py-2 border-l-4 border-background-hard bg-background/30 rounded-r-lg text-foreground-soft">
                {children}
              </blockquote>
            )
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
