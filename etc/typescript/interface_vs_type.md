# Interface vs Type

## Основные различия

### 1. **Расширяемость (Declaration Merging)**

**Interface** поддерживает объединение объявлений:
```tsx
interface User {
  name: string
}

interface User {
  age: number
}

// Результат: User = { name: string; age: number }
const user: User = {
  name: "Иван",
  age: 25
}
```

**Type** не поддерживает объединение:
```tsx
type User = {
  name: string
}

// ❌ Ошибка! Duplicate identifier 'User'
type User = {
  age: number
}
```

### 2. **Расширение и наследование**

**Interface** использует `extends`:
```tsx
interface Animal {
  name: string
}

interface Dog extends Animal {
  breed: string
}

interface Cat extends Animal {
  color: string
}

// Множественное наследование
interface Pet extends Dog, Cat {
  owner: string
}
```

**Type** использует `&` (intersection):
```tsx
type Animal = {
  name: string
}

type Dog = Animal & {
  breed: string
}

type Cat = Animal & {
  color: string
}

// Множественное пересечение
type Pet = Dog & Cat & {
  owner: string
}
```

### 3. **Объединение типов**

**Type** поддерживает union types:
```tsx
type Status = "loading" | "success" | "error"
type ID = string | number
type Response<T> = T | null | undefined
```

**Interface** не поддерживает union напрямую:
```tsx
// ❌ Нельзя создать union interface
interface Status = "loading" | "success" | "error"

// ✅ Но можно создать union из interfaces 
interface LoadingState {
  status: "loading"
}

interface SuccessState {
  status: "success"
  data: any
}

interface ErrorState {
  status: "error"
  error: string
}

type State = LoadingState | SuccessState | ErrorState
```

### 4. **Вычисляемые свойства**

**Type** поддерживает mapped types:
```tsx
type User = {
  id: number
  name: string
  email: string
}

// Сделать все поля опциональными
type PartialUser = Partial<User>

// Сделать все поля только для чтения
type ReadonlyUser = Readonly<User>

// Создать новый тип на основе существующего
type UserKeys = keyof User // "id" | "name" | "email"

type UserValues = User[UserKeys] // number | string
```

**Interface** не поддерживает mapped types напрямую:
```tsx
// ❌ Нельзя использовать mapped types с interface
interface PartialUser = Partial<User>
```

### 5. **Условные типы**

**Type** поддерживает conditional types:
```tsx
type NonNullable<T> = T extends null | undefined ? never : T
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any
type Parameters<T> = T extends (...args: infer P) => any ? P : never
```

**Interface** не поддерживает conditional types.

## Практические примеры

### **Когда использовать Interface:**

```tsx
// 1. Объектные типы с возможностью расширения
interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

interface ButtonProps extends ComponentProps {
  variant: "primary" | "secondary"
  onClick?: () => void
}

// 2. API контракты
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// 3. Классы
interface Animal {
  name: string
  makeSound(): void
}

class Dog implements Animal {
  constructor(public name: string) {}
  
  makeSound() {
    console.log("Гав!")
  }
}
```

### **Когда использовать Type:**

```tsx
// 1. Union типы
type Status = "idle" | "loading" | "success" | "error"
type Theme = "light" | "dark" | "auto"

// 2. Функциональные типы
type EventHandler<T = Event> = (event: T) => void
type AsyncFunction<T> = () => Promise<T>

// 3. Mapped types
type Optional<T> = {
  [K in keyof T]?: T[K]
}

type Required<T> = {
  [K in keyof T]-?: T[K]
}

// 4. Conditional types
type IsString<T> = T extends string ? true : false
type ArrayElement<T> = T extends Array<infer U> ? U : never

// 5. Tuple types
type Coordinates = [number, number]
type RGB = [number, number, number]
```

## Рекомендации для вашего проекта

### **Используйте Interface для:**

```tsx
// Компоненты и их пропсы
interface ButtonProps {
  variant: "primary" | "secondary" | "danger"
  size: "sm" | "md" | "lg"
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

// API модели
interface User {
  id: number
  name: string
  email: string
  createdAt: Date
}

// Сервисы
interface ApiService {
  get<T>(url: string): Promise<T>
  post<T>(url: string, data: any): Promise<T>
  put<T>(url: string, data: any): Promise<T>
  delete(url: string): Promise<void>
}
```

### **Используйте Type для:**

```tsx
// Состояния
type LoadingState = "idle" | "loading" | "success" | "error"

// Утилитарные типы
type Optional<T> = {
  [K in keyof T]?: T[K]
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

// Функциональные типы
type EventHandler<T = Event> = (event: T) => void
type AsyncFunction<T> = () => Promise<T>

// Tuple типы
type Point = [number, number]
type Color = [number, number, number, number]
```

## Общие рекомендации

1. **Начинайте с Interface** для объектных типов
2. **Используйте Type** для union, intersection и utility types
3. **Будьте консистентны** в рамках проекта
4. **Предпочитайте Interface** для публичных API
5. **Используйте Type** для внутренних утилитарных типов

В вашем проекте рекомендую придерживаться этих принципов для лучшей читаемости и поддерживаемости кода.
