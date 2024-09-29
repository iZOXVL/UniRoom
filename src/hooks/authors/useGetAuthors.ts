"use client";
import { useEffect, useState } from "react";
import { Author } from "@/types/Author";

export const useGetAuthors = () => {
  const [autores, setAutores] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const response = await fetch("https://localhost:7122/api/Autor");
        const data = await response.json();
        setAutores(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAutores();
  }, []);

  return { autores, loading, error };
};
