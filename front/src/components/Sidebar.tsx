export default function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold">AiDrom</h1>
      </div>
      <nav className="flex-1 p-4">
        {/* Навигационное меню */}
        <ul className="space-y-2">
          <li>
            <a href="#" className="block p-2 rounded hover:bg-sidebar-accent text-sidebar-accent-foreground">
              Главная
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 rounded hover:bg-sidebar-accent text-sidebar-accent-foreground">
              Проекты
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 rounded hover:bg-sidebar-accent text-sidebar-accent-foreground">
              Настройки
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
