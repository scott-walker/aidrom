import { makeClasses } from "@lib/style-api"
import { createTheme } from "@uiw/codemirror-themes"
import { markdown } from "@codemirror/lang-markdown"
import { EditorView } from "@uiw/react-codemirror"
import { tags } from "@lezer/highlight"
import CodeMirror from "@uiw/react-codemirror"

/**
 * Пропсы компонента для редактирования Markdown
 * @namespace Shared.UI.MarkdownEditor.Props
 */
type Props = {
  value: string
  error?: boolean
  minHeight?: string
  maxHeight?: string
  className?: string
  onChange?: (value: string) => void
}

/**
 * Компонент для редактирования Markdown
 * @namespace Shared.UI.MarkdownEditor
 */
export const MarkdownEditor = ({
  value,
  error = false,
  onChange = () => {},
  minHeight = "158px",
  maxHeight = "158px",
  className = ""
}: Props) => {
  const classes = makeClasses("cursor-text", className)
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
      { tag: tags.heading1, color: "var(--color-primary)", fontWeight: "bold", fontSize: "1.6em" },
      { tag: tags.heading2, color: "var(--color-primary)", fontWeight: "bold", fontSize: "1.3em" },
      { tag: tags.heading3, color: "var(--color-primary)", fontWeight: "bold", fontSize: "1.1em" },
      { tag: tags.heading4, color: "var(--color-primary)", fontWeight: "bold" },
      { tag: tags.heading5, color: "var(--color-primary)", fontWeight: "bold" },
      { tag: tags.heading6, color: "var(--color-primary)", fontWeight: "bold" },
      { tag: tags.strong, color: "var(--color-foreground)", fontWeight: "900" },
      { tag: tags.emphasis, color: "var(--color-primary)", fontStyle: "italic" },
      { tag: tags.contentSeparator, color: "var(--color-primary)", fontWeight: "900" },
      { tag: tags.strikethrough, color: "var(--color-foreground)", textDecoration: "line-through" },
      { tag: tags.link, color: "var(--color-primary)", textDecoration: "underline" },
      { tag: tags.list, color: "var(--color-foreground)" },
      { tag: tags.quote, color: "var(--color-foreground-soft)", fontStyle: "italic" },
      {
        tag: tags.monospace,
        color: "var(--color-foreground-hard)",
        backgroundColor: "var(--color-background-hard)",
        fontFamily: "var(--font-family-mono)"
      }
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
  const extensions = [markdown(), viewTheme]

  return (
    <div className={classes}>
      <CodeMirror
        value={value}
        theme={theme}
        extensions={extensions}
        editable={true}
        className={classes}
        onChange={onChange}
        width="100%"
        minHeight={minHeight}
        maxHeight={maxHeight}
      />
    </div>
  )
}
