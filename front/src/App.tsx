import MainLayout from "./layouts/main"
import { Input } from "@ui/Input"
import { Button } from "@ui/Button"
import { Skeleton } from "@ui/Skeleton"
import { Separator } from "@ui/Separator"
import { Tooltip, TooltipTrigger, TooltipContent } from "@ui/Tooltip"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@ui/Sheet"

export default function App() {
  const button = <Button>Отправить</Button>
  const skeletons = (
    <div>
      <strong>ЖМИ</strong> (но не нажимай) 🤪
    </div>
  )

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow p-6 h-full">
        <h3 className="text-xl font-semibold mb-4">Добро пожаловать в AiDrom</h3>

        <div className="flex gap-2 my-4">
          <Separator />
        </div>

        <p className="text-gray-600">Контент страницы будет размещен здесь</p>

        <div className="flex gap-2 mt-4">
          <Input placeholder="Введите текст" />
          {/* <Button>Отправить</Button> */}

          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side="left" align="center">
              Tooltip-Tooltip
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>фывфывфыв</TooltipTrigger>
            <TooltipContent>
              <div>Идет отправка...</div>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex gap-4 mt-4">
          <Skeleton className="w-20 h-20" />
          <Skeleton className="w-20 h-20" />
          <Skeleton className="w-20 h-20" />
          <Skeleton className="w-20 h-20" />
          <Skeleton className="w-20 h-20" />
          <Skeleton className="w-20 h-20" />
        </div>

        <div className="flex gap-2 mt-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  {/* <Label htmlFor="sheet-demo-name">Name</Label> */}
                  <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-3">
                  {/* <Label htmlFor="sheet-demo-username">Username</Label> */}
                  <Input id="sheet-demo-username" defaultValue="@peduarte" />
                </div>
              </div>
              <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-4 mt-4">
          <Button variant="outline" asChild>
            {skeletons}
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
