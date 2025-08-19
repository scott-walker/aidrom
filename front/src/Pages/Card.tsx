import { Button } from "@ui/Button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@components/Card"

export default function Test() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Тест компонента Card</CardTitle>
        <CardDescription className="content-format">
          <p>
            В React + Tailwind есть несколько подходов, и «правильность» зависит от того, насколько хочется
            оптимизировать и как разворачиваешь приложение.
          </p>
        </CardDescription>
        <CardAction>
          <Button>Выполнить команду</Button>
        </CardAction>
      </CardHeader>

      <CardContent className="content-format">
        <h3>Компонент Card в AiDrom</h3>
        <p>
          🔥 Отличный выбор! Да, shadcn/ui реально хорош тем, что даёт фундаментальные компоненты, а не жёсткий
          фреймворк со своим стилем. Получается гибко, современно и «со вкусом», если немного уделить внимание
          настройке.
        </p>
        <p>Если пойдёшь этим путём, то:</p>
        <ul>
          <li>буквально через пару часов можно собрать чат с приятным UI (пузыри, кнопки, поля ввода, темная тема);</li>
          <li>всё будет адаптивным, доступным и легко расширяемым;</li>
          <li>а со временем можно подстроить дизайн под свой бренд (или сделать «как в Slack/Telegram/Discord»).</li>
        </ul>
        <ul>
          <li>
            <strong>Vite</strong> — быстрый сборщик, который подходит для разработки React-приложений.
          </li>
          <li>
            <strong>Tailwind CSS</strong> — мощный CSS-фреймворк, который позволяет создавать стили без написания
            CSS-кода.
          </li>
        </ul>
      </CardContent>

      <CardFooter className="content-format">
        <ul>
          <li>Новые компоненты, которые нет в shadcn/ui, можно будет добавить вручную</li>
          <li>Реализовать кастомные стили для компонентов</li>
          <li>Получить опыт работы с React и Tailwind</li>
        </ul>
      </CardFooter>
    </Card>
  )
}
