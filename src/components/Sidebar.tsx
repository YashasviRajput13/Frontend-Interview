import { useState, useMemo } from "react"
import { useBlogs } from "../hooks/useBlogs"
import { getRelativeTime, truncateText } from "../utils/index.ts"
import { SidebarSkeleton } from "./Skeletons"
import { SIDEBAR_LABELS } from "../constants/index.ts"

interface SidebarProps {
  onSelect: (id: string) => void
  activeId: string
}

const Sidebar = ({ onSelect, activeId }: SidebarProps) => {
  const { data, isLoading, error } = useBlogs()
  const [searchQuery, setSearchQuery] = useState("")

  const getLabel = (index: number) => {
    return SIDEBAR_LABELS[index % SIDEBAR_LABELS.length]
  }

  const filteredBlogs = useMemo(() => {
    if (!data) return []
    if (!searchQuery.trim()) return data

    const query = searchQuery.toLowerCase()
    return data.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        (blog.category && blog.category.some((cat) => cat.toLowerCase().includes(query)))
    )
  }, [data, searchQuery])

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onSelect(id)
    }
  }

  if (isLoading) {
    return <SidebarSkeleton />
  }

  if (error) {
    return (
      <div className="sidebar-error" role="alert">
        <span className="sidebar-error-icon">⚠️</span>
        <p className="sidebar-error-text">Failed to load articles</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="sidebar-empty" role="status">
        <div className="sidebar-empty-icon">📝</div>
        <p className="sidebar-empty-title">No articles yet</p>
        <p className="sidebar-empty-text">Start creating!</p>
      </div>
    )
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb" }}>
        <input
          type="search"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search articles"
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            fontSize: "0.9em",
            fontFamily: "inherit",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#7c3aed"
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124, 58, 237, 0.1)"
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#d1d5db"
            e.currentTarget.style.boxShadow = "none"
          }}
        />
        {searchQuery && (
          <div style={{ fontSize: "0.8em", color: "#6b7280", marginTop: "0.5rem" }}>
            {filteredBlogs.length} result{filteredBlogs.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
      <ul className="sidebar-list" role="listbox" style={{ flex: 1, overflow: "auto" }}>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <li key={blog.id} role="option" aria-selected={activeId === String(blog.id)}>
              <div
                className={`blog-item ${activeId === String(blog.id) ? "active" : ""}`}
                onClick={() => onSelect(String(blog.id))}
                onKeyDown={(e) => handleKeyDown(e, String(blog.id))}
                role="button"
                tabIndex={0}
                aria-label={`Read article: ${blog.title}`}
              >
                {blog.category && blog.category.length > 0 && (
                  <div className="blog-item-category">
                    📌 {blog.category[0].toUpperCase()}
                  </div>
                )}
                {blog.date && (
                  <div className="blog-item-meta">
                    {getRelativeTime(blog.date)}
                  </div>
                )}
                <div className="blog-item-title">{truncateText(blog.title, 50)}</div>
                <div className="blog-item-description">{truncateText(blog.description, 80)}</div>
                <div className="blog-item-label">
                  {getLabel(index)}
                </div>
              </div>
            </li>
          ))
        ) : (
          <div
            style={{
              padding: "2rem 1rem",
              textAlign: "center",
              color: "#6b7280",
            }}
            role="status"
          >
            <div style={{ fontSize: "2em", marginBottom: "0.5rem" }}>🔍</div>
            <p>No articles found for "{searchQuery}"</p>
          </div>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
