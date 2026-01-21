import { useBlogById } from "../hooks/useBlogs"

interface BlogDetailProps {
  blogId: number | null
}

const BlogDetail = ({ blogId }: BlogDetailProps) => {
  const { data, isLoading, error } = useBlogById(blogId)

  if (!blogId) {
    return <p className="p-4 text-gray-500">Select a blog to view details</p>
  }

  if (isLoading) {
    return <p className="p-4">Loading blog...</p>
  }

  if (error) {
    return <p className="p-4 text-red-500">Error loading blog</p>
  }

  if (!data) return null

  return (
    <div className="p-4">
      <img
        src={data.coverImage}
        alt={data.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      <h2 className="text-2xl font-semibold mb-2">{data.title}</h2>

      <p className="text-sm text-gray-500 mb-4">
        {data.category.join(", ")} •{" "}
        {new Date(data.date).toLocaleDateString()}
      </p>

      <p className="text-gray-700 whitespace-pre-line">
        {data.content}
      </p>
    </div>
  )
}

export default BlogDetail
