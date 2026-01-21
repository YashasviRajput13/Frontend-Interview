import React from "react"
import type { ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9fafb",
          }}
        >
          <div style={{ marginBottom: "1rem", fontSize: "3em" }}>😞</div>
          <h1 style={{ fontSize: "1.5em", color: "#1f2937", marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>
          <p
            style={{
              color: "#6b7280",
              marginBottom: "1.5rem",
              maxWidth: "400px",
            }}
          >
            We encountered an unexpected error. Try refreshing the page or contact
            support if the problem persists.
          </p>
          {this.state.error && (
            <details
              style={{
                marginBottom: "1.5rem",
                backgroundColor: "#fee",
                padding: "1rem",
                borderRadius: "0.5rem",
                textAlign: "left",
                maxWidth: "500px",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "500" }}>
                Error Details
              </summary>
              <pre
                style={{
                  overflow: "auto",
                  marginTop: "0.5rem",
                  fontSize: "0.85em",
                  color: "#dc2626",
                }}
              >
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <button
            onClick={this.handleReset}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontSize: "1em",
              fontWeight: "500",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#6d28d9"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#7c3aed"
            }}
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
