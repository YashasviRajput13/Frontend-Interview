import { useBlogs } from "../hooks/useBlogs"

interface BlogListProps {
  onSelect: (id: number) => void
}

const BlogList = ({ onSelect }: BlogListProps) => {
  const { data, isLoading, error } = useBlogs()

  if (isLoading) return <p className="p-4">Loading blogs...</p>
  if (error) return <p className="p-4 text-red-500">Error loading blogs</p>

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Blogs</h2>

      <ul className="space-y-2">
        {data?.map((blog) => (
          <li
            key={blog.id}
            onClick={() => onSelect(blog.id!)}
            className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
          >
            <h3 className="font-medium">{blog.title}</h3>
            <p className="text-sm text-gray-500">
              {blog.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
