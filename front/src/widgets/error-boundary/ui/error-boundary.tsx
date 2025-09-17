import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router"
import { makeClasses } from "@lib/style-api"
import { useTitle, useSubtitle } from "@lib/layout-api"
import { Card } from "@ui/card"
import { Button } from "@ui/button"
import { InfinityLoader } from "@ui/loader"

/**
 * Компонент ErrorBoundary
 * @namespace Widgets.ErrorBoundary
 */
export const ErrorBoundary = () => {
  useTitle("Ошибка")

  const error = useRouteError()
  const navigate = useNavigate()

  let errorMessage = "Произошла непредвиденная ошибка"
  let errorStatus = 500
  let errorDetails = null

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status
    errorMessage = error.statusText || "Страница не найдена"
    errorDetails = error.data?.message
  } else if (error instanceof Error) {
    errorMessage = error.message
    errorDetails = error.stack
  }

  useSubtitle(errorMessage)

  const containerClasses = makeClasses(
    "flex",
    "flex-col",
    "gap-4",
    "h-full",
    "w-full",
    "px-(--layout-inner-offset-x)",
    "py-(--layout-inner-offset-y)"
  )
  const errorClasses = makeClasses("flex", "items-center", "justify-between")
  const errorTitleClasses = makeClasses(
    "flex-1",
    "p-4",
    "rounded-lg",
    "bg-warning",
    "text-warning-foreground",
    "text-2xl",
    "font-bold",
    "font-family-display"
  )

  return (
    <div className={containerClasses}>
      <div className={errorClasses}>
        <div className={errorTitleClasses}>
          {errorStatus} | {errorMessage}
        </div>
        <div className="flex gap-4 px-8">
          <Button schema="hard" onClick={() => window.location.reload()}>
            Обновить страницу
          </Button>
          <Button schema="hard" onClick={() => window.history.back()}>
            Назад
          </Button>
          <Button schema="warning" onClick={() => navigate("/")}>
            На главную
          </Button>
        </div>
      </div>

      <Card className="w-full">
        <Card.Body className="gap-4 py-4">
          <div className="text-lg">
            {errorStatus === 404
              ? "Запрашиваемая страница не существует."
              : "Что-то пошло не так. Мы уже работаем над исправлением."}
          </div>

          <div className="flex flex-col gap-2">
            {errorDetails && (
              <div className="border-2 border-border rounded-md p-2 select-none">
                <h6 className="mb-4 font-bold text-lg">Детали ошибки (для разработчиков)</h6>
                <pre className="text-lg">{errorDetails}</pre>
              </div>
            )}
          </div>
        </Card.Body>

        <div className="flex justify-center">
          <InfinityLoader />
        </div>
      </Card>
    </div>
  )
}
