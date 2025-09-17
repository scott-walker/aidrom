import type { FC, ReactNode } from "react"
import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import { createTheme } from "@uiw/codemirror-themes"
import { json } from "@codemirror/lang-json"
import { tags } from "@lezer/highlight"
import { makeClasses, makeVariants } from "@lib/style-api"
import type { Value } from "./types"
import { formatValue } from "./utils"

/**
 * Пропсы компонента для отображения JSON
 * @namespace Ui.Json.Props
 */
type Props = {
  value: Value
  interactive?: boolean
  editable?: boolean
  schema?: "default" | "terminal"
  error?: boolean
  minHeight?: string
  onChange?: (value: Value) => void
  className?: string
}

/**
 * Компонент для отображения JSON
 * @namespace Ui.Json
 * @param props.value - данные для отображения
 * @param props.interactive - режим интерактивный
 * @param props.editable - режим редактируемый
 * @param props.error - режим ошибки
 * @param props.className - CSS-классы
 */
export const Json: FC<Props> = ({
  value,
  interactive = false,
  schema = "default",
  editable = false,
  error = false,
  className = "",
  minHeight = "158px",
  onChange = () => {}
}: Props): ReactNode => {
  if (!interactive && !editable) {
    value = formatValue(value)

    const preClasses = makeVariants({
      beforeClasses: makeClasses(
        "px-4",
        "py-2",
        "w-full",
        "bg-background",
        "text-foreground",
        "text-base",
        "rounded-xl",
        "overflow-x-auto",
        "overflow-y-auto"
      ),
      afterClasses: className,
      variants: {
        terminal: makeClasses(
          "bg-foreground-hard/93",
          "text-positive-accent",
          "dark:bg-background-hard",
          "dark:text-positive-accent"
        )
      }
    })

    return (
      <pre className={preClasses(schema)}>
        <code className="p-0">{value}</code>
      </pre>
    )
  }

  const classes = makeClasses("overflow-x-auto", "overflow-y-auto", "cursor-text", "w-full", "max-w-full", className)
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
    "&.cm-editor": {
      border: `2px solid ${error ? "var(--color-danger)" : "transparent"}`,
      borderRadius: "var(--ui-rounded)",
      outline: "none",
      transition: "border-color var(--ui-transition-border-duration) ease-in-out"
    },
    "&.cm-editor.cm-focused, &.cm-editor:hover": {
      borderColor: error ? "var(--color-danger)" : "var(--color-primary)"
    },
    ".cm-scroller": {
      borderRadius: "var(--ui-rounded)"
    },
    ".cm-content, .cm-gutter": { minHeight },
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
        value={formatValue(value)}
        theme={theme}
        extensions={extensions}
        readOnly={!editable}
        editable={editable}
        className={classes}
        onChange={onChange}
        width="100%"
        height="100%"
      />
    </div>
  )
}
