import type { FC, ReactNode } from "react"
import { Code } from "@ui/Code"
import { Button } from "@ui/Button"
import { Brand } from "@components/Brand"
import { InfobarTrigger } from "@layouts/Lucent/InfobarTrigger"

/**
 * Главная страница
 * @namespace Pages.Dashboard
 * @returns {ReactNode}
 */
export const Dashboard: FC = (): ReactNode => {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl font-bold text-foreground-hard font-family-display">Страница "Dashboard"</h1>
      <p className="text-2xl text-foreground font-family-base">Прямо сейчас ты находишься на главной странице</p>
      <Code accent className="mt-10">
        console.log("Hello, world!")
      </Code>

      <div className="flex flex-col gap-4 mt-10">
        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="soft" size="xs">
            Soft XS
          </Button>
          <Button variant="soft" size="sm">
            Soft SM
          </Button>
          <Button variant="soft" size="md">
            Soft MD
          </Button>
          <Button variant="soft" size="lg">
            Soft LG
          </Button>
          <Button variant="soft" size="xl">
            Soft XL
          </Button>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="hard" size="xs">
            Hard XS
          </Button>
          <Button variant="hard" size="sm">
            Hard SM
          </Button>
          <Button variant="hard" size="md">
            Hard MD
          </Button>
          <Button variant="hard" size="lg">
            Hard LG
          </Button>
          <Button variant="hard" size="xl">
            Hard XL
          </Button>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="primary" size="xs">
            Primary XS
          </Button>
          <Button variant="primary" size="sm">
            Primary SM
          </Button>
          <Button variant="primary" size="md">
            Primary MD
          </Button>
          <Button variant="primary" size="lg">
            Primary LG
          </Button>
          <Button variant="primary" size="xl">
            Primary XL
          </Button>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="warning" size="xs">
            Warning XS
          </Button>
          <Button variant="warning" size="sm">
            Warning SM
          </Button>
          <Button variant="warning" size="md">
            Warning MD
          </Button>
          <Button variant="warning" size="lg">
            Warning LG
          </Button>
          <Button variant="warning" size="xl">
            Warning XL
          </Button>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="danger" size="xs">
            Danger XS
          </Button>
          <Button variant="danger" size="sm">
            Danger SM
          </Button>
          <Button variant="danger" size="md">
            Danger MD
          </Button>
          <Button variant="danger" size="lg">
            Danger LG
          </Button>
          <Button variant="danger" size="xl">
            Danger XL
          </Button>
        </div>
      </div>

      <div className="flex justify-between mt-10 flex-wrap">
        <InfobarTrigger />

        <div className="flex flex-col gap-4 flex-wrap">
          <Brand size="sm" />
          <Brand size="md" />
          <Brand size="lg" />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-10 w-full flex-wrap">
        <div className="p-10 w-50 bg-background-soft text-pink-500 font-bold">Background Soft</div>
        <div className="p-10 w-50 bg-background text-pink-500 font-bold">Background</div>
        <div className="p-10 w-50 bg-background-hard text-pink-500 font-bold">Background Hard</div>
      </div>

      <div className="flex justify-end gap-4 mt-10 w-full flex-wrap">
        <div className="p-10 w-50 bg-foreground-soft text-pink-500 font-bold">Foreground Soft</div>
        <div className="p-10 w-50 bg-foreground text-pink-500 font-bold">Foreground</div>
        <div className="p-10 w-50 bg-foreground-hard text-pink-500 font-bold">Foreground Hard</div>
      </div>

      {/* <div className="flex justify-end gap-4 mt-10 w-full">
        {genBgColors(40, ["foreground-soft", "foreground", "foreground-hard"])}
      </div> */}

      <div className="mt-10 w-full h-40 bg-gradient-brand rounded-2xl" />
    </div>
  )
}
