import { useNavigate } from "react-router"
import { Loader } from "@ui/loader/loader"
import { Notification } from "@ui/notification"
import { useRequests, RequestsTable as BaseRequestsTable, type RequestsFilterData } from "@entities/request"

/**
 * Таблица запросов к провайдерам
 * @namespace Widgets.RequestsTable.Ui.RequestsTable
 */
export const RequestsTable = ({ filters }: { filters: RequestsFilterData }) => {
  const { requests, isLoading, error } = useRequests(filters)
  const navigate = useNavigate()

  if (isLoading) {
    return <Loader />
  }

  if (!Object.keys(filters).length) {
    return <Notification type="info">Необходимо выбрать фильтры</Notification>
  }

  if (error) {
    return <Notification type="error">{(error as Error).message}</Notification>
  }

  if (requests.length === 0) {
    return <Notification type="info">Запросов не найдено</Notification>
  }

  return <BaseRequestsTable requests={requests} onRowClick={({ id }) => navigate(`/service/requests/${id}`)} />
}
