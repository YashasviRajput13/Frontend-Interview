// Navigation constants
export const NAV_LINKS = [
  { label: "Tools", href: "#" },
  { label: "Practice", href: "#" },
  { label: "Events", href: "#" },
  { label: "Job Board", href: "#" },
  { label: "Points", href: "#" },
] as const

// Sidebar labels for blog categories
export const SIDEBAR_LABELS = ["Featured", "Study Tips", "Taxation", "Development"] as const

// Blog form constants
export const BLOG_FORM = {
  TITLE_PLACEHOLDER: "Enter an engaging title...",
  CATEGORY_PLACEHOLDER: "e.g., Finance, Career, Accounting",
  COVER_IMAGE_PLACEHOLDER: "https://example.com/image.jpg",
  DESCRIPTION_PLACEHOLDER: "Write a brief summary of your article...",
  CONTENT_PLACEHOLDER: "Write your full article content here...",
} as const

// Read time calculation
export const WORDS_PER_MINUTE = 200

// Footer links
export const FOOTER_SECTIONS = {
  RESOURCES: [
    { label: "Blog", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Case Studies", href: "#" },
  ],
  PLATFORM: [
    { label: "Job Board", href: "#" },
    { label: "Practice Tests", href: "#" },
    { label: "Mentorship", href: "#" },
  ],
  CONNECT: [
    { label: "LinkedIn", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
  ],
} as const
