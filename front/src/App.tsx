import MainLayout from "./layouts/main"
import { ChatExample } from "@components/Chat"

export default function App() {
  return (
    <MainLayout>
      <div className="flex gap-5 flex-wrap">
        <ChatExample />
      </div>
    </MainLayout>
  )
}
