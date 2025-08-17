// import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"
// import { cva, VariantProps } from "class-variance-authority"
// import { PanelLeftIcon } from "lucide-react"

// import { useIsMobile } from "@/components/Sidebar/hooks"
// import { cn } from "src/components/lib/utils"
// import { Button } from "src/components/ui/button"
// import { Input } from "src/components/ui/input"
// import { Separator } from "src/components/ui/separator"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "src/components/ui/sheet"
// import { Skeleton } from "src/components/ui/skeleton"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "src/components/ui/tooltip"





// function SidebarMenuSkeleton({
//   className,
//   showIcon = false,
//   ...props
// }: React.ComponentProps<"div"> & {
//   showIcon?: boolean
// }) {
//   // Random width between 50 to 90%.
//   const width = React.useMemo(() => {
//     return `${Math.floor(Math.random() * 40) + 50}%`
//   }, [])

//   return (
//     <div
//       data-slot="sidebar-menu-skeleton"
//       data-sidebar="menu-skeleton"
//       className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
//       {...props}
//     >
//       {showIcon && (
//         <Skeleton
//           className="size-4 rounded-md"
//           data-sidebar="menu-skeleton-icon"
//         />
//       )}
//       <Skeleton
//         className="h-4 max-w-(--skeleton-width) flex-1"
//         data-sidebar="menu-skeleton-text"
//         style={
//           {
//             "--skeleton-width": width,
//           } as React.CSSProperties
//         }
//       />
//     </div>
//   )
// }

// function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
//   return (
//     <ul
//       data-slot="sidebar-menu-sub"
//       data-sidebar="menu-sub"
//       className={cn(
//         "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
//         "group-data-[collapsible=icon]:hidden",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function SidebarMenuSubItem({
//   className,
//   ...props
// }: React.ComponentProps<"li">) {
//   return (
//     <li
//       data-slot="sidebar-menu-sub-item"
//       data-sidebar="menu-sub-item"
//       className={cn("group/menu-sub-item relative", className)}
//       {...props}
//     />
//   )
// }

// function SidebarMenuSubButton({
//   asChild = false,
//   size = "md",
//   isActive = false,
//   className,
//   ...props
// }: React.ComponentProps<"a"> & {
//   asChild?: boolean
//   size?: "sm" | "md"
//   isActive?: boolean
// }) {
//   const Comp = asChild ? Slot : "a"

//   return (
//     <Comp
//       data-slot="sidebar-menu-sub-button"
//       data-sidebar="menu-sub-button"
//       data-size={size}
//       data-active={isActive}
//       className={cn(
//         "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
//         "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
//         size === "sm" && "text-xs",
//         size === "md" && "text-sm",
//         "group-data-[collapsible=icon]:hidden",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupAction,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarInput,
//   SidebarInset,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuBadge,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSkeleton,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
//   SidebarProvider,
//   SidebarRail,
//   SidebarSeparator,
//   SidebarTrigger,
//   useSidebar,
// }
