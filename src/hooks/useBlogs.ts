import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Blog } from "../types/blog.ts"

const API_URL = "http://localhost:3001/blogs"

export const useBlogs = () => {
  return useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error("Failed to fetch blogs")
      return res.json()
    },
  })
}

export const useBlogById = (id: number) => {
  return useQuery<Blog>({
    queryKey: ["blogs", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`${API_URL}/${id}`)
      if (!res.ok) throw new Error("Failed to fetch blog")
      return res.json()
    },
  })
}

export const useCreateBlog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (blog: Omit<Blog, "id">) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      })
      if (!res.ok) throw new Error("Failed to create blog")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
  })
}
