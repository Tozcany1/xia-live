import { convertToModelMessages, type UIMessage } from "ai";
import { DEFAULT_MODEL, SUPPORTED_MODELS } from "@/lib/constants";
import OpenAI from "openai";

export const maxDuration = 60;

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  const {
    messages,
    modelId = DEFAULT_MODEL,
  }: { messages: UIMessage[]; modelId: string } = await req.json();

  // Validación (la dejamos igual, no rompemos tu lógica)
  if (!SUPPORTED_MODELS.includes(modelId)) {
    return new Response(
      JSON.stringify({ error: `Model ${modelId} is not supported` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const completion = await openrouter.chat.completions.create({
      model: modelId,
      messages: convertToModelMessages(messages),
    });

    return new Response(
      JSON.stringify({
        role: "assistant",
        content: completion.choices[0].message.content,
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
