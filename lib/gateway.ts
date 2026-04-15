import { createOpenAI } from "ai-sdk/openai";

export const gateway = (modelId: string) => {
  const openrouter = createOpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  return openrouter(modelId);
};
