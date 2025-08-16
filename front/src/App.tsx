import MainLayout from "./layouts/main"

export default function App() {
  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow p-6 h-full">
        <h3 className="text-xl font-semibold mb-4">
          Добро пожаловать в AiDrom
        </h3>
        <p className="text-gray-600">Контент страницы будет размещен здесь</p>
      </div>
    </MainLayout>
  )
}
