import { useState } from "react"
import BlogListPanel from "./components/BlogListPanel"
import BlogDetail from "./components/BlogDetail"
import CreateBlogForm from "./components/CreateBlogForm"

export default function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null)

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-4">
      <div className="border-r overflow-y-auto">
        <CreateBlogForm />
        <BlogListPanel onSelect={setSelectedBlogId} />
      </div>

      <div className="md:col-span-3 overflow-y-auto">
        <BlogDetail blogId={selectedBlogId} />
      </div>
    </div>
  )
}
