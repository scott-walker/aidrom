import { Button } from "@ui/Button"

export default function Header() {
  return (
    <header className="h-16 bg-header text-header-foreground flex items-center justify-between px-6">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold">Панель управления</h2>
      </div>
      <div className="flex items-center space-x-4">
        <Button>Профиль</Button>
      </div>
    </header>
  )
}
