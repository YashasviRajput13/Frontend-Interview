import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getBlogs, getBlogById, createBlog } from "../api/blogs"
import type { Blog } from "../api/blogs"

// Fetch all blogs
export const useBlogs = () => {
  return useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  })
}

// Fetch blog by ID
export const useBlogById = (id: number | null) => {
  return useQuery<Blog>({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id as number),
    enabled: !!id,
  })
}

// Create new blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
  })
}
