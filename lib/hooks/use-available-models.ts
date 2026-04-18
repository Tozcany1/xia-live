"use client";

import { useEffect, useState } from "react";

export function useAvailableModels() {
  const [models, setModels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setModels([
        "llama-3.1-70b-versatile",
        "llama-3.1-8b-instant", 
        "mixtral-8x7b-32768"
      ]);
      setError(null);
    } catch (e) {
      setError("No se pudieron cargar los modelos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { models, isLoading, error };
}
