import type { JSX } from "react"
import { Wallet, LogOut, User } from "lucide-react"
import { mergeClasses } from "@utils/jsxtools"
import { SidebarTrigger } from "@components/Sidebar"
import { Button } from "@ui/Button"

/**
 * Классы для шапки макета
 * @type {string}
 */
const headerClasses: string = mergeClasses(
  "flex",
  "items-center",
  "justify-between",
  "px-3",
  "h-13",
  "bg-header",
  "text-header-foreground"
)

/**
 * Шапка макета
 * @returns {JSX.Element} - Шапка макета
 */
export default function Header(): JSX.Element {
  return (
    <header className={headerClasses}>
      <SidebarTrigger />

      <div className="flex items-center space-x-4 gap-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wallet />
          Баланс <span className="font-bold text-lg">275</span>
        </div>

        <div className="flex items-center">
          <User className="w-8 h-8 p-1 bg-primary text-primary-foreground rounded-full font-bold" />
          <Button variant="link">Ponck Stranger</Button>
          <Button variant="link" className="p-0">
            <LogOut className="size-5 text-foreground" />
          </Button>
        </div>
      </div>
    </header>
  )
}
