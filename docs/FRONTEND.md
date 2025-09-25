# Frontend Документация

## Технологический стек

- **React**: 19.1.1
- **TypeScript**: 5.8.3 
- **Vite**: 7.1.2
- **React Router**: 7.8.2
- **Tailwind CSS**: 4.1.12
- **TanStack Query**: 5.87.1
- **Zustand**: 5.0.8
- **Lucide React**: 0.539.0

## Архитектура Frontend

### Feature Sliced Design (FSD)

Проект построен по методологии Feature Sliced Design, обеспечивающей модульность и предсказуемость архитектуры.

```
front/src/
├── app/           # Конфигурация приложения
├── pages/         # Страницы приложения  
├── widgets/       # Композитные UI блоки
├── features/      # Бизнес-функции
├── entities/      # Бизнес-сущности
└── shared/        # Переиспользуемый код
```

### Слои FSD

1. **App** - инициализация приложения, провайдеры, роутинг
2. **Pages** - страницы приложения с роутингом
3. **Widgets** - крупные композитные UI блоки
4. **Features** - бизнес-функции (CRUD операции, формы)
5. **Entities** - бизнес-сущности (Agent, Chat, Provider)
6. **Shared** - переиспользуемый код (UI, utils, API)

### Правила зависимостей

```
Направление зависимостей (можно импортировать):
pages → widgets → features → entities → shared

Запрещено:
- features → features (кросс-импорты фич)
- entities → features/widgets/pages
- shared → любой верхний слой
```

## Структура директорий

### App слой
```
app/
├── index.ts          # Экспорты приложения
├── providers/        # React провайдеры
│   ├── app-provider.tsx
│   ├── query-provider.tsx
│   └── index.ts
└── router.tsx        # Конфигурация роутинга
```

### Pages слой
```
pages/
├── agents/           # Страницы агентов
│   ├── layout.tsx    # Layout для секции
│   ├── routes.tsx    # Роуты секции
│   └── pages/        # Конкретные страницы
├── chat/             # Страницы чатов
├── dashboard/        # Дашборд
├── service/          # Сервисные страницы
├── test/             # Тестовые страницы
├── error/            # Страницы ошибок
└── index.ts          # Экспорт всех страниц
```

### Widgets слой
```
widgets/
├── agent-create/     # Виджет создания агента
├── agent-list/       # Список агентов
├── agent-rules/      # Правила агента
├── chat-dialog/      # Диалог чата
├── chat-panel/       # Панель чата
├── layout/           # Основной layout
├── layout-header/    # Шапка
├── layout-sidebar/   # Боковая панель
└── provider-list/    # Список провайдеров
```

### Features слой
```
features/
├── agent-delete/     # Удаление агента
├── agent-form/       # Форма агента
├── agent-params/     # Параметры агента
├── agent-rules/      # Управление правилами
├── chat-create/      # Создание чата
├── chat-input/       # Ввод сообщений
├── chat-interface/   # Интерфейс чата
├── chat-list/        # Список чатов
├── chat-messages/    # Сообщения чата
├── data-manager/     # Управление данными
├── provider-config/  # Конфигурация провайдеров
├── provider-form/    # Форма провайдера
└── toasts/           # Уведомления
```

### Entities слой
```
entities/
├── agent/            # Сущность агента
│   ├── api/          # API методы
│   ├── lib/          # Типы, схемы, утилиты
│   ├── ui/           # UI компоненты
│   └── index.ts      # Публичный API
├── chat/             # Сущность чата
├── client/           # Сущность клиента
├── provider/         # Сущность провайдера
└── request/          # Сущность запроса
```

### Shared слой
```
shared/
├── api/              # HTTP клиент
├── lib/              # Библиотеки
│   ├── layout-api/   # API для layouts
│   ├── page-api/     # API для страниц
│   └── style-api/    # API для стилей
├── styles/           # Глобальные стили
├── ui/               # UI компоненты
└── utils/            # Утилиты
```

## Конфигурация Vite

### Алиасы путей
```typescript
{
  "@app": "./src/app",
  "@pages": "./src/pages", 
  "@widgets": "./src/widgets",
  "@features": "./src/features",
  "@entities": "./src/entities",
  "@shared": "./src/shared",
  "@utils": "./src/shared/utils",
  "@lib": "./src/shared/lib",
  "@ui": "./src/shared/ui",
  "@api": "./src/shared/api",
  "@styles": "./src/shared/styles"
}
```

### Плагины
- **@vitejs/plugin-react-swc** - React с SWC компилятором
- **@tailwindcss/vite** - Tailwind CSS интеграция

## Роутинг

### Структура маршрутов

```typescript
// Основной роутер
router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/agents/*", element: <AgentsRoutes /> },
      { path: "/chat/*", element: <ChatRoutes /> },
      { path: "/service/*", element: <ServiceRoutes /> }
    ]
  }
])
```

### Ленивая загрузка

Все страницы загружаются асинхронно:

```typescript
{
  path: "agents/:agentId",
  lazy: async () => {
    const { Agent } = await import("./pages/agent")
    return { element: <Agent /> }
  }
}
```

### Layout система

Каждая секция имеет собственный layout:

```typescript
// pages/agents/layout.tsx
export const AgentsLayout = ({ children }) => (
  <div className="agents-layout">
    <Sidebar />
    <main>{children}</main>
  </div>
)
```

## Управление состоянием

### TanStack Query

Управление серверным состоянием:

```typescript
// entities/agent/api/agent-queries.ts
export const useAgents = () => {
  return useQuery({
    queryKey: ['agents'],
    queryFn: () => agentApi.getAgents()
  })
}

export const useCreateAgent = () => {
  return useMutation({
    mutationFn: agentApi.createAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] })
    }
  })
}
```

### Zustand

Управление клиентским состоянием:

```typescript
// features/chat-list/store/chat-list-store.ts
export const useChatListStore = create<ChatListStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))
```

## Типизация

### Схемы сущностей

```typescript
// entities/agent/lib/schema.ts
export interface Agent {
  id: number
  name: string
  avatar: string
  params: AgentParams
  description: string
  providerId: number
  provider: Provider
  rules: AgentRule[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AgentParams {
  model: string
  temperature: number
  maxTokens: number
  [key: string]: unknown
}
```

### API типы

```typescript
// shared/api/types.ts
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  error: string
  code: string
  details?: Record<string, unknown>
}
```

## UI система

### Базовые компоненты

```
shared/ui/
├── button.tsx       # Кнопки
├── input.tsx        # Поля ввода  
├── card/            # Карточки
├── table/           # Таблицы
├── form-field.tsx   # Поля форм
├── modal.tsx        # Модальные окна
├── popover.tsx      # Поповеры
├── select.tsx       # Селекты
├── loader/          # Лоадеры
├── markdown/        # Markdown рендер
└── toasts/          # Toast уведомления
```

### Стилизация

**Tailwind CSS** с кастомными токенами:

```css
/* shared/styles/tokens/colors.css */
:root {
  --color-primary: #3b82f6;
  --color-primary-foreground: #ffffff;
  --color-background: #ffffff;
  --color-background-soft: #f8fafc;
  --color-foreground: #0f172a;
  --color-muted: #64748b;
}
```

### Адаптивность

Используется mobile-first подход:

```css
/* Базовые стили для мобильных */
.container {
  @apply w-full px-4;
}

/* Планшеты и больше */
@media (min-width: 768px) {
  .container {
    @apply px-6;
  }
}

/* Десктоп */
@media (min-width: 1024px) {
  .container {
    @apply px-8 max-w-6xl mx-auto;
  }
}
```

## API интеграция

### REST клиент

```typescript
// shared/api/rest-client.ts
export class RestClient {
  private baseURL: string
  
  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  
  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`)
    if (!response.ok) throw new RestError(response)
    return response.json()
  }
  
  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new RestError(response)
    return response.json()
  }
}
```

### API слой entities

```typescript
// entities/agent/api/agent-api.ts
export const agentApi = {
  getAgents: (): Promise<Agent[]> => 
    restClient.get('/agents'),
    
  getAgent: (id: number): Promise<Agent> => 
    restClient.get(`/agents/${id}`),
    
  createAgent: (data: CreateAgentData): Promise<Agent> => 
    restClient.post('/agents', data),
    
  updateAgent: (id: number, data: UpdateAgentData): Promise<Agent> => 
    restClient.put(`/agents/${id}`, data),
    
  deleteAgent: (id: number): Promise<void> => 
    restClient.delete(`/agents/${id}`)
}
```

## Компоненты архитектуры

### Entity компонент

```typescript
// entities/agent/ui/agent-card.tsx
interface AgentCardProps {
  agent: Agent
  onClick?: (agent: Agent) => void
}

export const AgentCard = ({ agent, onClick }: AgentCardProps) => {
  return (
    <Card onClick={() => onClick?.(agent)}>
      <Card.Header>
        <Avatar src={agent.avatar} />
        <Heading>{agent.name}</Heading>
      </Card.Header>
      <Card.Body>
        <p>{agent.description}</p>
      </Card.Body>
    </Card>
  )
}
```

### Feature компонент

```typescript
// features/agent-form/ui/agent-form.tsx
export const AgentForm = () => {
  const createAgent = useCreateAgent()
  const { register, handleSubmit } = useForm<AgentFormData>()
  
  const onSubmit = (data: AgentFormData) => {
    createAgent.mutate(data)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <FormLabel>Название</FormLabel>
        <Input {...register('name')} />
      </FormField>
      <Button type="submit">Создать</Button>
    </form>
  )
}
```

### Widget компонент

```typescript
// widgets/agent-list/ui/agent-list.tsx
export const AgentList = () => {
  const { data: agents, isLoading } = useAgents()
  
  if (isLoading) return <LoaderBlock />
  
  return (
    <div className="grid gap-4">
      {agents?.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  )
}
```

## Оптимизация производительности

### Code Splitting

- Ленивая загрузка страниц
- Динамические импорты для крупных библиотек
- Чанкинг по роутам

### Оптимизация запросов

- Дедупликация запросов (TanStack Query)
- Кэширование данных
- Оптимистичные обновления

### Виртуализация

Для больших списков:

```typescript
// Виртуализация списка сообщений
import { useVirtualizer } from '@tanstack/react-virtual'

export const MessageList = ({ messages }) => {
  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50
  })
  
  return (
    <div ref={parentRef} className="h-full overflow-auto">
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(item => (
          <div key={item.key} style={virtualizer.getItemStyle(item)}>
            <Message message={messages[item.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Тестирование

### Структура тестов

```
__tests__/
├── entities/     # Тесты бизнес-логики
├── features/     # Тесты функций
├── shared/       # Тесты утилит и UI
└── pages/        # Интеграционные тесты
```

### Типы тестов

- **Unit тесты** - utils, хуки, компоненты
- **Integration тесты** - взаимодействие компонентов
- **E2E тесты** - пользовательские сценарии

## Деплоймент

### Production build

```bash
npm run build
# Создает dist/ с оптимизированными ресурсами
```

### Docker контейнер

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Переменные окружения

```env
# Разработка
VITE_API_BASE_URL=http://localhost:3001
VITE_FRONTEND_BASE_URL=http://localhost:3000

# Продакшен  
VITE_API_BASE_URL=https://api.aidrom.lc
VITE_FRONTEND_BASE_URL=https://aidrom.lc
```
