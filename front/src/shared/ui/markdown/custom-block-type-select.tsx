import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { FORMAT_ELEMENT_COMMAND, type EditorThemeClasses } from "lexical"

import { Select } from "@ui/select"

type ElementFormatType = EditorThemeClasses[keyof EditorThemeClasses]

export const CustomBlockTypeSelect = () => {
  const [editor] = useLexicalComposerContext()

  const handleChange = (value: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value)
  }

  return (
    <Select
      placeholder="Тип блока"
      items={[
        { label: "Параграф", value: "paragraph" },
        { label: "Заголовок 1", value: "h1" },
        { label: "Заголовок 2", value: "h2" },
        { label: "Заголовок 3", value: "h3" },
        { label: "Заголовок 4", value: "h4" },
        { label: "Заголовок 5", value: "h5" },
        { label: "Заголовок 6", value: "h6" },
        { label: "Маркированный список", value: "ul" },
        { label: "Нумерованный список", value: "ol" }
      ]}
      onChangeValue={handleChange}
    />
  )
}
