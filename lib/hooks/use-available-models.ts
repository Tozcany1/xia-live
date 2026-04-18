"use client";

import { useEffect, useState } from "react";

export function useAvailableModels() {
  const [models, setModels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setModels([
      "llama-3.1-70b-versatile",
      "llama-3.1-8b-instant", 
      "mixtral-8x7b-32768"
    ]);
    setIsLoading(false);
  }, []);

  return { models, isLoading };
}
