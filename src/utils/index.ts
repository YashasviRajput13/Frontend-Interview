import { WORDS_PER_MINUTE } from "../constants"

/**
 * Calculate read time in minutes based on content length
 */
export const calculateReadTime = (content: string | undefined): number => {
  if (!content) return 0
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / WORDS_PER_MINUTE)
}

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * Calculate relative time (e.g., "2 days ago")
 */
export const getRelativeTime = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffDays > 0) return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`
  if (diffHours > 0) return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`
  if (diffMinutes > 0) return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`
  return "Just now"
}

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, length: number): string => {
  return text.length > length ? `${text.substring(0, length)}...` : text
}

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Split categories from comma-separated string
 */
export const parseCategories = (categoryString: string): string[] => {
  return categoryString
    .split(",")
    .map((cat) => cat.trim())
    .filter((cat) => cat.length > 0)
}
