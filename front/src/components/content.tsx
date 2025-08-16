import type { PropsWithChildren } from "react"

export default function Content({ children }: PropsWithChildren) {
  return (
    <main className="flex-1 p-6 bg-background text-foreground">
      <div className="h-full">{children}</div>
    </main>
  )
}
