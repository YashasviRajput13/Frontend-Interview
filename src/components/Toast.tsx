import React, { createContext, useContext, useState, useCallback } from "react"

export type ToastType = "success" | "error" | "info" | "warning"

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type?: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(
    (message: string, type: ToastType = "info", duration: number = 3000) => {
      const id = Date.now().toString()
      const toast: Toast = { id, message, type, duration }

      setToasts((prev) => [...prev, toast])

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast(): Omit<ToastContextType, "toasts"> {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return { addToast: context.addToast, removeToast: context.removeToast }
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return "✓"
      case "error":
        return "✕"
      case "warning":
        return "⚠"
      default:
        return "ℹ"
    }
  }

  const getBackgroundColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "#dcfce7"
      case "error":
        return "#fee2e2"
      case "warning":
        return "#fef3c7"
      default:
        return "#dbeafe"
    }
  }

  const getBorderColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "#86efac"
      case "error":
        return "#fca5a5"
      case "warning":
        return "#fcd34d"
      default:
        return "#93c5fd"
    }
  }

  const getTextColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "#166534"
      case "error":
        return "#991b1b"
      case "warning":
        return "#92400e"
      default:
        return "#1e40af"
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            backgroundColor: getBackgroundColor(toast.type),
            border: `1px solid ${getBorderColor(toast.type)}`,
            borderRadius: "0.5rem",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            animation: "slideIn 0.3s ease-out",
            pointerEvents: "auto",
            minWidth: "300px",
            maxWidth: "500px",
          }}
          role="alert"
          aria-live="polite"
        >
          <span
            style={{
              color: getTextColor(toast.type),
              fontSize: "1.2em",
              fontWeight: "bold",
              minWidth: "24px",
              textAlign: "center",
            }}
          >
            {getIcon(toast.type)}
          </span>
          <span style={{ color: getTextColor(toast.type), flex: 1 }}>
            {toast.message}
          </span>
          <button
            onClick={() => onRemove(toast.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: getTextColor(toast.type),
              fontSize: "1.2em",
              padding: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "24px",
              minHeight: "24px",
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = "1"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = "0.7"
            }}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
