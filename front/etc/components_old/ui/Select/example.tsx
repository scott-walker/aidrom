import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./index"

/**
 * Пример использования компонента Select
 * @namespace Ui.Select.Example
 */
export const SelectExample = () => {
  const [value, setValue] = useState<string>("")

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <label htmlFor="framework" className="text-sm font-medium">
          Выберите фреймворк
        </label>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger id="framework" size="default">
            <SelectValue placeholder="Выберите фреймворк" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Frontend</SelectLabel>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
              <SelectItem value="angular">Angular</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Backend</SelectLabel>
              <SelectItem value="node">Node.js</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-muted-foreground">Выбранное значение: {value || "Не выбрано"}</div>
    </div>
  )
}
