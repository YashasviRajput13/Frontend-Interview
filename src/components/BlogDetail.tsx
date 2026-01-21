import { useBlogById } from "../hooks/useBlogs"
import { calculateReadTime, formatDate } from "../utils/index.ts"
import { BlogDetailSkeleton } from "./Skeletons"

interface BlogDetailProps {
  id: string
}

const BlogDetail = ({ id }: BlogDetailProps) => {
  const { data, isLoading, error } = useBlogById(Number(id))

  const handleShare = async () => {
    if (navigator.share && data) {
      try {
        await navigator.share({
          title: data.title,
          text: data.description,
          url: window.location.href,
        })
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error)
        }
      }
    } else {
      // Fallback: copy to clipboard
      const text = `${data?.title}\n${window.location.href}`
      navigator.clipboard.writeText(text).catch(() => {
        alert("Copy the URL manually to share this article")
      })
    }
  }

  if (isLoading) {
    return <BlogDetailSkeleton />
  }

  if (error) {
    return (
      <div className="blog-detail-error" role="alert">
        <div className="error-icon">❌</div>
        <h2>Error loading article</h2>
        <p>We couldn't load this article. Please try again.</p>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const readTime = calculateReadTime(data.content)
  const formattedDate = formatDate(data.date)

  return (
    <article className="blog-detail-wrapper">
      <div className="blog-detail-container">
        {data.coverImage && (
          <div className="blog-detail-hero">
            <img src={data.coverImage} alt={`Cover image for ${data.title}`} loading="lazy" />
          </div>
        )}

        <div className="blog-detail-content">
          <div className="blog-detail-header">
            <div>
              {data.category && data.category.length > 0 && (
                <span className="blog-detail-category" role="doc-subtitle">
                  {data.category[0].toUpperCase()}
                </span>
              )}
              <h1 className="blog-detail-title">{data.title}</h1>
            </div>
            <button
              className="share-btn"
              onClick={handleShare}
              aria-label="Share this article"
              title="Share article"
            >
              ⬆️ Share Article
            </button>
          </div>

          <div className="blog-detail-meta">
            {data.category && data.category.length > 0 && (
              <div className="meta-item">
                <strong>CATEGORY</strong>
                <span>{data.category[0]}</span>
              </div>
            )}
            {readTime > 0 && (
              <div className="meta-item">
                <strong>READ TIME</strong>
                <span>{readTime} min{readTime !== 1 ? "s" : ""}</span>
              </div>
            )}
            <div className="meta-item">
              <strong>DATE</strong>
              <time dateTime={data.date}>{formattedDate}</time>
            </div>
          </div>

          {data.description && (
            <p className="blog-detail-description">{data.description}</p>
          )}

          <div className="blog-detail-body">
            {data.content?.split("\n").map((paragraph: string, idx: number) => {
              if (paragraph.trim() === "") return null

              // Handle blockquotes
              if (paragraph.startsWith('"') && paragraph.endsWith('"')) {
                return (
                  <blockquote key={idx} className="blog-detail-quote">
                    {paragraph.replace(/"/g, "")}
                  </blockquote>
                )
              }

              // Handle headers (lines starting with #)
              if (paragraph.startsWith("#")) {
                const level = Math.min(paragraph.match(/^#+/)?.[0].length || 2, 6) as 1 | 2 | 3 | 4 | 5 | 6
                const text = paragraph.replace(/^#+\s*/, "")
                const HeadingComponents: Record<1 | 2 | 3 | 4 | 5 | 6, React.ElementType> = {
                  1: "h1",
                  2: "h2",
                  3: "h3",
                  4: "h4",
                  5: "h5",
                  6: "h6",
                }
                const HeadingTag = HeadingComponents[level]
                return (
                  <HeadingTag key={idx} style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
                    {text}
                  </HeadingTag>
                )
              }

              // Regular paragraph
              return (
                <p key={idx} style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                  {paragraph}
                </p>
              )
            })}
          </div>

          <div className="blog-detail-author">
            <div className="blog-detail-author-avatar">📝</div>
            <div className="blog-detail-author-info">
              <h4>Written by Arjun Mehta</h4>
              <p>Senior Financial Analyst</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogDetail
