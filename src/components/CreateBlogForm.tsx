import { useState } from "react"
import { useCreateBlog } from "../hooks/useBlogs"

const CreateBlogForm = () => {
  const { mutate, isPending, error } = useCreateBlog()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    mutate({
      title,
      category: category.split(",").map((c) => c.trim()),
      description,
      content,
      coverImage,
      date: new Date().toISOString(),
    })

    setTitle("")
    setCategory("")
    setDescription("")
    setContent("")
    setCoverImage("")
  }

  const inputClass =
    "w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"

  return (
    <form
      onSubmit={handleSubmit}
      className="m-4 p-4 space-y-4 bg-zinc-900 border border-zinc-800 rounded-xl"
    >
      <h2 className="text-lg font-semibold">Create Blog</h2>

      <input
        className={inputClass}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className={inputClass}
        placeholder="Category (Finance, Tech)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        className={inputClass}
        placeholder="Cover Image URL"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        required
      />

      <textarea
        className={inputClass}
        placeholder="Short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <textarea
        className={`${inputClass} h-32`}
        placeholder="Blog content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-emerald-600 hover:bg-emerald-500 py-2 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {isPending ? "Publishing…" : "Publish"}
      </button>

      {error && (
        <p className="text-red-400 text-sm">
          Failed to create blog
        </p>
      )}
    </form>
  )
}

export default CreateBlogForm
