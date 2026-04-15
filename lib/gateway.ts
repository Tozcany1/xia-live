import OpenAI from "openai";

export const gateway = (modelId: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  return {
    provider: "openai",
    model: modelId,
    client: openai,
  };
};
