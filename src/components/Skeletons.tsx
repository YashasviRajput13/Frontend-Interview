interface BlogSkeletonProps {
  count?: number
}

export const BlogItemSkeleton = () => (
  <div className="blog-item skeleton">
    <div className="skeleton-line skeleton-category"></div>
    <div className="skeleton-line skeleton-title"></div>
    <div className="skeleton-line skeleton-description"></div>
    <div className="skeleton-line skeleton-description-short"></div>
    <div className="skeleton-line skeleton-label"></div>
  </div>
)

export const SidebarSkeleton = ({ count = 5 }: BlogSkeletonProps) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <BlogItemSkeleton key={i} />
    ))}
  </>
)

export const BlogDetailSkeleton = () => (
  <div className="blog-detail-container skeleton">
    <div className="skeleton-hero"></div>
    <div className="blog-detail-content">
      <div className="skeleton-line skeleton-big" style={{ width: "80%", marginBottom: "2rem" }}></div>
      <div className="skeleton-line skeleton-medium" style={{ marginBottom: "1rem" }}></div>
      <div className="skeleton-line skeleton-small" style={{ marginBottom: "3rem" }}></div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-line skeleton-medium"></div>
        ))}
      </div>

      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton-line skeleton-text" style={{ marginBottom: "1rem" }}></div>
      ))}
    </div>
  </div>
)
