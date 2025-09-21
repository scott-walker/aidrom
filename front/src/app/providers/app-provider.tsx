// import { Profiler } from "react"
import { Toasts } from "@features/toasts"
import { QueryProvider } from "./query-provider"

/**
 * Провайдер приложения
 * @namespace App.Provider.AppProvider
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // const onRender = (
  //   id: string,
  //   phase: string,
  //   actualDuration: number,
  //   baseDuration: number,
  //   startTime: number,
  //   commitTime: number
  // ) => {
  //   console.log({
  //     id,
  //     phase,
  //     actualDuration,
  //     baseDuration,
  //     startTime,
  //     commitTime
  //   })
  // }

  return (
    // <Profiler id="App" onRender={onRender}>
    <QueryProvider>
      {children}
      <Toasts />
    </QueryProvider>
    // </Profiler>
  )
}
