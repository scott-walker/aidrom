// import "@mdxeditor/editor/style.css"
import styles from "./markdown.module.css"
import { Typography } from "@ui/typography"
// import { CustomBlockTypeSelect } from "./custom-block-type-select"
import {
  type CodeBlockEditorDescriptor,
  MDXEditor,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  linkPlugin,
  codeBlockPlugin,
  useCodeBlockEditorContext,
  CodeToggle,
  InsertCodeBlock,
  ListsToggle,
  Separator,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  InsertThematicBreak
  // BlockTypeSelect
} from "@mdxeditor/editor"

/**
 * Пропсы компонента для редактирования Markdown
 * @namespace Shared.UI.MarkdownEditor.Props
 */
type Props = {
  children: string
}

/**
 * Компонент для редактирования Markdown
 * @namespace Shared.UI.MarkdownEditor
 * @param {Props} props
 * @returns {ReactNode}
 */
export const MarkdownEditor = ({ children }: Props) => {
  // Кастомный редактор для кода (слишком много ебли с этим было)
  const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
    match: () => true,
    priority: 0,
    Editor: props => {
      const cb = useCodeBlockEditorContext()
      return (
        <pre onKeyDown={e => e.nativeEvent.stopImmediatePropagation()}>
          <code
            className="w-full"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onChange={e => cb.setCode((e.target as HTMLElement).textContent || "")}
            dangerouslySetInnerHTML={{ __html: props.code }}
          />
        </pre>
      )
    }
  }

  const plugins = [
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    linkPlugin(),
    codeBlockPlugin({ codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor] }),
    thematicBreakPlugin(),
    toolbarPlugin({
      toolbarClassName: styles.markdownEditorPanel,
      toolbarContents: () => (
        <>
          <BoldItalicUnderlineToggles />
          <Separator />
          <ListsToggle />
          <Separator />
          <CodeToggle />
          <InsertCodeBlock />
          <Separator />
          <InsertThematicBreak />
          {/* <BlockTypeSelect /> */}
          {/* <CustomBlockTypeSelect /> */}
        </>
      )
    })
  ]
  return (
    <Typography>
      <MDXEditor markdown={children.trim()} plugins={plugins} contentEditableClassName={styles.markdownEditorContent} />
    </Typography>
  )
}
