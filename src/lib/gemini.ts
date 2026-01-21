export async function generateBlogWithAI(
  title: string,
  category: string
): Promise<{ description: string; content: string }> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
      import.meta.env.VITE_GEMINI_API_KEY
    }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Write a blog titled "${title}" in the category "${category}".
Return output in this exact format:

DESCRIPTION:
<short description>

CONTENT:
<full blog content>

Use plain text only.`,
              },
            ],
          },
        ],
      }),
    }
  )

  const data = await response.json()
  const text = data.candidates[0].content.parts[0].text as string

  const descriptionMatch = text.match(/DESCRIPTION:\s*([\s\S]*?)\nCONTENT:/)
  const contentMatch = text.match(/CONTENT:\s*([\s\S]*)/)

  return {
    description: descriptionMatch?.[1]?.trim() || "",
    content: contentMatch?.[1]?.trim() || "",
  }
}
