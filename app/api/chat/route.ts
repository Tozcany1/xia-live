import OpenAI from "openai";

export const maxDuration = 60;

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await openrouter.chat.completions.create({
      model: "openrouter/auto",
      messages,
    });

    return new Response(
      JSON.stringify({
        role: "assistant",
        content: completion.choices[0]?.message?.content || "",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("OpenRouter error:", error);

    return new Response(
      JSON.stringify({ error: "Error al conectar con OpenRouter" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
