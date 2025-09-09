import type { ComponentProps, FC, ReactNode } from "react"
import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import { createTheme } from "@uiw/codemirror-themes"
import { json } from "@codemirror/lang-json"
import { tags } from "@lezer/highlight"
import { makeClasses } from "@lib/style-api"

/**
 * Пропсы компонента для отображения JSON
 * @namespace Ui.Json.Props
 */
type Props = ComponentProps<"pre"> & {
  data: string | object
  interactive?: boolean
  editable?: boolean
}

/**
 * Компонент для отображения JSON
 * @namespace Ui.Json
 * @param props.data - данные для отображения
 * @param props.interactive - режим интерактивный
 * @param props.editable - режим редактируемый
 * @param props.className - CSS-классы
 */
export const Json: FC<Props> = ({ data, interactive = false, editable = false, className = "" }: Props): ReactNode => {
  const content = typeof data === "string" ? data : JSON.stringify(data, null, 2)

  if (!interactive && !editable) {
    const preClasses = makeClasses("px-8", "py-6", "bg-background", "rounded-xl", className)
    const codeClasses = makeClasses("p-0", "text-lg", "text-foreground-hard")

    return (
      <pre className={preClasses}>
        <code className={codeClasses}>{content}</code>
      </pre>
    )
  }

  const classes = makeClasses("overflow-x-auto", "overflow-y-auto", className)
  const theme = createTheme({
    theme: "light",
    settings: {
      fontFamily: "var(--font-family-mono)",
      fontSize: "var(--text-lg)",
      background: "var(--color-background)",
      backgroundImage: "",
      foreground: "var(--color-foreground)",
      caret: "var(--color-primary)",
      selection: "var(--color-primary-ghost-hard)",
      selectionMatch: "var(--color-primary-ghost-hard)",
      lineHighlight: "var(--color-primary-ghost-hard)",
      gutterBackground: "var(--color-background)",
      gutterForeground: "var(--color-foreground-soft)",
      gutterBorder: "var(--color-background)"
    },
    styles: [
      { tag: tags.propertyName, color: "var(--color-foreground)", fontWeight: "bold" },
      { tag: tags.string, color: "var(--color-foreground-soft)" },
      { tag: tags.number, color: "var(--color-primary)" },
      { tag: tags.comment, color: "var(--color-foreground-soft)", fontStyle: "italic" },
      { tag: tags.punctuation, color: "var(--color-foreground)" }
    ]
  })
  const viewTheme = EditorView.theme({
    ".cm-foldPlaceholder": {
      backgroundColor: "var(--color-background)",
      color: "var(--color-primary)",
      border: "1px solid var(--color-primary)",
      borderRadius: "10px",
      padding: "0px 10px",
      fontWeight: "bold"
    },
    ".cm-foldPlaceholder:hover": {
      backgroundColor: "var(--color-primary-ghost-hard)"
    }
  })
  const extensions = [json(), viewTheme]

  return (
    <div className={classes}>
      <CodeMirror
        value={content}
        theme={theme}
        extensions={extensions}
        readOnly={!editable}
        editable={editable}
        className={classes}
        width="100%"
        height="100%"
      />
    </div>
  )
}
