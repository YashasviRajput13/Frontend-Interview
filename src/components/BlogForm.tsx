import { useState } from "react"
import { useCreateBlog } from "../hooks/useBlogs.ts"
import { useToast } from "./Toast.tsx"
import type { Blog } from "../types/blog.ts"
import { parseCategories, isValidUrl } from "../utils/index.ts"
import { BLOG_FORM } from "../constants/index.ts"

interface BlogFormProps {
  onSuccess: (blog: Blog) => void
  onCancel: () => void
}

interface FormErrors {
  title?: string
  category?: string
  coverImage?: string
  description?: string
  content?: string
}

const BlogForm = ({ onSuccess, onCancel }: BlogFormProps) => {
  const { mutate, isPending } = useCreateBlog()
  const { addToast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    coverImage: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Title is required"
        if (value.trim().length < 5) return "Title must be at least 5 characters"
        if (value.trim().length > 200) return "Title must not exceed 200 characters"
        return undefined

      case "category":
        if (!value.trim()) return "Category is required"
        const categories = parseCategories(value)
        if (categories.length === 0) return "Please enter at least one category"
        return undefined

      case "coverImage":
        if (!value.trim()) return "Cover image URL is required"
        if (!isValidUrl(value)) return "Please enter a valid URL"
        return undefined

      case "description":
        if (!value.trim()) return "Description is required"
        if (value.trim().length < 10) return "Description must be at least 10 characters"
        if (value.trim().length > 500) return "Description must not exceed 500 characters"
        return undefined

      case "content":
        if (!value.trim()) return "Content is required"
        if (value.trim().length < 50) return "Content must be at least 50 characters"
        return undefined

      default:
        return undefined
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touchedFields.has(name)) {
      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouchedFields((prev) => new Set(prev).add(name))
    const error = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        newErrors[key as keyof FormErrors] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      addToast("Please fix the errors in the form", "error")
      return
    }

    mutate(
      {
        title: formData.title.trim(),
        category: parseCategories(formData.category),
        description: formData.description.trim(),
        content: formData.content.trim(),
        coverImage: formData.coverImage.trim(),
        date: new Date().toISOString(),
      },
      {
        onSuccess: (blog) => {
          setFormData({ title: "", category: "", description: "", content: "", coverImage: "" })
          setErrors({})
          setTouchedFields(new Set())
          addToast("Blog created successfully!", "success")
          onSuccess(blog)
        },
        onError: (error) => {
          addToast("Failed to create blog. Please try again.", "error")
          console.error("Blog creation error:", error)
        },
      }
    )
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <form onSubmit={handleSubmit} className="blog-form-container" noValidate>
      <div className="form-content">
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Blog Title <span className="form-required">*</span>
          </label>
          <input
            id="title"
            name="title"
            className={`form-input ${errors.title ? "form-input--error" : ""}`}
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={BLOG_FORM.TITLE_PLACEHOLDER}
            maxLength={200}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <span id="title-error" className="form-error">
              {errors.title}
            </span>
          )}
          <span className="form-hint">{formData.title.length}/200 characters</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Categories <span className="form-required">*</span>
            </label>
            <input
              id="category"
              name="category"
              className={`form-input ${errors.category ? "form-input--error" : ""}`}
              value={formData.category}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={BLOG_FORM.CATEGORY_PLACEHOLDER}
              aria-invalid={!!errors.category}
              aria-describedby={errors.category ? "category-error" : undefined}
            />
            {errors.category && (
              <span id="category-error" className="form-error">
                {errors.category}
              </span>
            )}
            <span className="form-hint">Separate multiple with commas</span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="coverImage">
              Cover Image URL <span className="form-required">*</span>
            </label>
            <input
              id="coverImage"
              name="coverImage"
              className={`form-input ${errors.coverImage ? "form-input--error" : ""}`}
              value={formData.coverImage}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={BLOG_FORM.COVER_IMAGE_PLACEHOLDER}
              type="url"
              aria-invalid={!!errors.coverImage}
              aria-describedby={errors.coverImage ? "coverImage-error" : undefined}
            />
            {errors.coverImage && (
              <span id="coverImage-error" className="form-error">
                {errors.coverImage}
              </span>
            )}
            {formData.coverImage && !errors.coverImage && (
              <div style={{ marginTop: "1rem" }}>
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    backgroundColor: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={formData.coverImage}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={() => {
                      addToast("Failed to load image preview", "warning")
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description <span className="form-required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            className={`form-textarea ${errors.description ? "form-input--error" : ""}`}
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={BLOG_FORM.DESCRIPTION_PLACEHOLDER}
            maxLength={500}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "description-error" : undefined}
            style={{ minHeight: "80px" }}
          />
          {errors.description && (
            <span id="description-error" className="form-error">
              {errors.description}
            </span>
          )}
          <span className="form-hint">{formData.description.length}/500 characters</span>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="content">
            Content <span className="form-required">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            className={`form-textarea ${errors.content ? "form-input--error" : ""}`}
            value={formData.content}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={BLOG_FORM.CONTENT_PLACEHOLDER}
            aria-invalid={!!errors.content}
            aria-describedby={errors.content ? "content-error" : undefined}
            style={{ minHeight: "300px" }}
          />
          {errors.content && (
            <span id="content-error" className="form-error">
              {errors.content}
            </span>
          )}
          <span className="form-hint">{formData.content.length} characters</span>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={isPending || hasErrors}
            className="btn-primary"
            aria-busy={isPending}
          >
            {isPending ? "Publishing..." : "Publish Article"}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary" disabled={isPending}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

export default BlogForm
