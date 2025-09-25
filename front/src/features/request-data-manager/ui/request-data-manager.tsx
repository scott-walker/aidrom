import { useState, useMemo, type FormEvent } from "react"
import { makeClasses } from "@lib/style-api"
import { Button } from "@ui/button"
import { Select, type SelectItem } from "@ui/select"
import type { RequestsFilterData } from "@entities/request"
import {
  SORT_ORDER_DESC,
  ProviderFilter,
  SearchFilter,
  Limiter,
  Sorter,
  type SorterOrder
} from "@features/data-manager"
import { RequestClear } from "@features/request-clear"
import { RequestDelete } from "@features/request-delete"
import { Label } from "@shared/ui/label"

/**
 * Пропсы
 * @namespace Features.RequestDataManager.Ui.RequestDataManagerProps
 */
interface RequestDataManagerProps {
  onFilter?: (filter: RequestsFilterData) => void
  onFilterQuery?: (filter: URLSearchParams) => void
  initialFilter?: RequestsFilterData
}

/**
 * Менеджер выборки данных для запросов к провайдерам
 * @namespace Features.RequestDataManager.Ui.RequestDataManager
 */
export const RequestDataManager = ({ initialFilter, onFilter, onFilterQuery }: RequestDataManagerProps) => {
  const sortItems = useMemo(
    () => [
      { label: "Дата создания", value: "createdAt" },
      { label: "Токены на вход", value: "requestTokens" },
      { label: "Токены на выход", value: "responseTokens" }
    ],
    []
  )
  const statusItems = useMemo(
    () => [
      { label: "Выполнено", value: "COMPLETED" },
      { label: "Ошибка", value: "ERROR" }
    ],
    []
  )

  const [providerId, setProviderId] = useState<string | null>(initialFilter?.providerId ?? null)
  const [searchById, setSearchById] = useState<string>(initialFilter?.searchById ?? "")
  const [status, setStatus] = useState<string | null>(initialFilter?.status ?? null)
  const [sortField, setSortField] = useState<string | null>(initialFilter?.sortField ?? sortItems[0].value)
  const [sortOrder, setSortOrder] = useState<SorterOrder>((initialFilter?.sortOrder as SorterOrder) ?? SORT_ORDER_DESC)
  const [limit, setLimit] = useState<number>(initialFilter?.limit ?? 20)

  const filters = useMemo<RequestsFilterData>(
    () => ({
      providerId,
      searchById,
      status,
      sortField,
      sortOrder,
      limit
    }),
    [providerId, searchById, status, sortField, sortOrder, limit]
  )

  const containerClasses = makeClasses(
    "flex",
    "flex-wrap",
    "align-center",
    "gap-4",
    "p-4",
    "bg-background-soft",
    "rounded-lg"
  )

  /**
   * Обработка фильтрации
   * @namespace Features.RequestDataManager.Ui.RequestDataManager.handleFilter
   */
  const handleFilter = () => {
    const queryParams = new URLSearchParams()

    if (providerId) {
      queryParams.set("providerId", providerId)
    }
    if (searchById) {
      queryParams.set("searchById", searchById)
    }
    if (status) {
      queryParams.set("status", status)
    }
    if (sortField) {
      queryParams.set("sortField", sortField)
    }
    if (sortOrder) {
      queryParams.set("sortOrder", sortOrder)
    }
    if (limit !== undefined) {
      queryParams.set("limit", limit.toString())
    }

    onFilter?.(filters)
    onFilterQuery?.(queryParams)
  }

  /**
   * Обработка отправки формы
   * @namespace Features.RequestDataManager.Ui.RequestDataManager.handleSubmit
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleFilter()
  }

  // Фильтр по ID запроса
  const searchFilter = useMemo(() => {
    return (
      <SearchFilter placeholder="Введите ID запроса" label="Поиск по ID" value={searchById} onChange={setSearchById} />
    )
  }, [searchById])

  // Фильтр по провайдеру
  const providerFilter = useMemo(() => {
    return <ProviderFilter providerId={providerId} onChange={setProviderId} />
  }, [providerId])

  // Фильтр по статусу
  const statusFilter = useMemo(() => {
    return (
      <Label text="Статус">
        <Select
          className="min-w-32"
          hasEmpty
          emptyLabel="Все"
          items={statusItems as SelectItem[]}
          value={status}
          onChangeValue={setStatus}
        />
      </Label>
    )
  }, [statusItems, status])

  // Сортировка
  const sorter = useMemo(() => {
    return (
      <Sorter
        items={sortItems}
        field={sortField}
        order={sortOrder}
        onChangeField={setSortField}
        onChangeOrder={setSortOrder}
      />
    )
  }, [sortItems, sortField, sortOrder])

  // Лимитер по количеству записей
  const limiter = useMemo(() => {
    return <Limiter label="Количество запросов" value={limit} onChange={setLimit} />
  }, [limit])

  return (
    <form className={containerClasses} onSubmit={handleSubmit}>
      <section>{searchFilter}</section>
      <section>{providerFilter}</section>
      <section>{statusFilter}</section>

      <div className="flex items-center gap-4 w-full">
        <section>{sorter}</section>
        <section>{limiter}</section>
      </div>

      <div className="flex items-center gap-4 w-full border-t border-border pt-4">
        <Button type="submit">Фильтровать</Button>
        <div className="flex items-center gap-4 ml-4">
          <RequestDelete filters={filters} />
          <RequestClear />
        </div>
      </div>
    </form>
  )
}
