import { useState } from "react"
import { useCreateBlog } from "../hooks/useBlogs"
import { generateBlogWithAI } from "../lib/gemini"

const CreateBlogForm = () => {
  const { mutate, isPending, error } = useCreateBlog()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [aiLoading, setAiLoading] = useState(false)

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

  const handleAIGenerate = async () => {
    if (!title || !category) {
      alert("Please enter title and category first")
      return
    }

    setAiLoading(true)

    try {
      const result = await generateBlogWithAI(title, category)
      setDescription(result.description)
      setContent(result.content)
    } catch (err) {
      alert("AI generation failed")
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <h2 className="text-xl font-semibold">Create Blog</h2>

      <input
        className="border p-2 w-full rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Category (Finance, Tech)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Cover Image URL"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        required
      />

      {/* AI BUTTON */}
      <button
        type="button"
        onClick={handleAIGenerate}
        disabled={aiLoading}
        className="border px-4 py-2 rounded text-sm disabled:opacity-50"
      >
        {aiLoading ? "AI is writing..." : "Generate with AI ✨"}
      </button>

      <p className="text-xs text-gray-500">
        AI-generated content. Please review before publishing.
      </p>

      <textarea
        className="border p-2 w-full rounded"
        placeholder="Short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full rounded h-32"
        placeholder="Blog content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isPending ? "Publishing..." : "Publish"}
      </button>

      {error && (
        <p className="text-red-500 text-sm">
          Failed to create blog
        </p>
      )}
    </form>
  )
}

export default CreateBlogForm
