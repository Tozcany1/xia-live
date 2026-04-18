"use client";

import { useEffect, useState } from "react";

type Model = {
  id: string;
  label: string;
};

export function useAvailableModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setModels([
        { id: "llama-3.1-70b-versatile", label: "Llama 3.1 70B" },
        { id: "llama-3.1-8b-instant", label: "Llama 3.1 8B" },
        { id: "mixtral-8x7b-32768", label: "Mixtral 8x7B" }
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
