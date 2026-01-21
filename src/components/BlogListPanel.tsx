import { useBlogs } from "../hooks/useBlogs"
import type { Blog } from "../api/blogs"

type BlogListPanelProps = {
  onSelect: (id: number) => void
}

export default function BlogListPanel({ onSelect }: BlogListPanelProps) {
  const { data, isLoading, error } = useBlogs()

  if (isLoading) {
    return <div className="p-4 text-zinc-400">Loading blogs…</div>
  }

  if (error) {
    return <div className="p-4 text-red-400">Failed to load blogs</div>
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-zinc-500 text-sm">
        No blogs yet. Create one ✨
      </div>
    )
  }

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold">Blogs</h2>

      <ul className="space-y-3">
        {data.map((blog: Blog) => (
          <li
            key={blog.id}
            onClick={() => onSelect(blog.id!)}
            className="border border-zinc-800 bg-zinc-900 rounded-xl p-4 cursor-pointer hover:border-indigo-500 transition"
          >
            <h3 className="font-semibold text-sm text-zinc-100">
              {blog.title}
            </h3>

            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              {blog.description}
            </p>

            <span className="inline-block mt-2 text-[10px] px-2 py-1 rounded bg-zinc-800 text-zinc-300">
              {blog.category[0]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
