import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Sidebar from "./components/Sidebar.tsx"
import BlogForm from "./components/BlogForm.tsx"
import BlogDetail from "./components/BlogDetail.tsx"
import { ErrorBoundary } from "./components/ErrorBoundary.tsx"
import { ToastProvider } from "./components/Toast.tsx"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const AppContent = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <header className="header">
          <div className="header-container">
            <a href="#" className="header-logo">
              <div className="header-logo-icon">📚</div>
              <span>CA Monk</span>
            </a>
            <nav className="header-nav">
              <a href="#" className="header-nav-link">Tools</a>
              <a href="#" className="header-nav-link">Practice</a>
              <a href="#" className="header-nav-link">Events</a>
              <a href="#" className="header-nav-link">Job Board</a>
              <a href="#" className="header-nav-link">Points</a>
              <button className="header-profile-btn">Profile</button>
            </nav>
          </div>
        </header>

        {isCreating ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div className="main-header">
              <div className="main-header-center">
                <h1>Create New Blog</h1>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
                <BlogForm
                  onSuccess={(blog) => {
                    setSelectedId(String(blog.id))
                    setIsCreating(false)
                  }}
                  onCancel={() => setIsCreating(false)}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="main-header">
              <div className="main-header-center">
                <h1>CA Monk Blog</h1>
                <p>Stay updated with the latest trends in finance, accounting, and career growth</p>
              </div>
            </div>

            <div className="app-main-wrapper">
              <aside className="sidebar">
                <div className="sidebar-header">
                  <h2>Latest Articles</h2>
                </div>
                <div className="sidebar-content">
                  <Sidebar
                    activeId={selectedId || ""}
                    onSelect={(id: string) => {
                      setSelectedId(id)
                      setIsCreating(false)
                    }}
                  />
                </div>
              </aside>

              <main className="main-content">
                {selectedId ? (
                  <BlogDetail id={selectedId} />
                ) : (
                  <div className="empty-state-main">
                    <div style={{ fontSize: "5em", marginBottom: "1rem" }}>📖</div>
                    <h2>Select an article to read</h2>
                    <p>Choose from the latest articles on the left</p>
                    <button
                      className="btn-primary"
                      onClick={() => setIsCreating(true)}
                      style={{ marginTop: "1.5rem" }}
                    >
                      + Create New Blog
                    </button>
                  </div>
                )}
              </main>
            </div>
          </>
        )}

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="footer-logo-icon">📚</div>
                <span>CA MONK</span>
              </div>
              <p>Empowering the next generation of financial leaders with tools, community, and knowledge.</p>
            </div>
            <div className="footer-section">
              <h4>RESOURCES</h4>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Webinars</a></li>
                <li><a href="#">Case Studies</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>PLATFORM</h4>
              <ul>
                <li><a href="#">Job Board</a></li>
                <li><a href="#">Practice Tests</a></li>
                <li><a href="#">Mentorship</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>CONNECT</h4>
              <ul>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 CA Monk. All rights reserved.</p>
            <div>
              <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
