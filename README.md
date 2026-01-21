# CA Monk – Blog Application (AI-Assisted)

This project is a Blog Application built as part of the **CA Monk Internship Assignment**.  
It demonstrates modern React development using **TypeScript**, **TanStack Query**, **Tailwind CSS**, and **shadcn/ui**, with an optional **AI-assisted blog generation feature using Google AI Studio (Gemini)**.

---

## 🚀 Tech Stack

- **React + TypeScript**
- **Vite**
- **TanStack Query (v5)** – server state management
- **Tailwind CSS** – styling
- **shadcn/ui** – UI components
- **JSON Server** – mock backend API
- **Google AI Studio (Gemini API)** – AI-assisted content generation

---

## 📂 Project Structure

```txt
src/
 ├─ api/
 │   └─ blogs.ts
 ├─ hooks/
 │   └─ useBlogs.ts
 ├─ components/
 │   ├─ BlogList.tsx
 │   ├─ BlogDetail.tsx
 │   └─ CreateBlogForm.tsx
 ├─ lib/
 │   ├─ queryClient.ts
 │   └─ gemini.ts
 ├─ App.tsx
 └─ main.tsx
