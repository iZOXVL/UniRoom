import { Author } from '@/types/Author';
import { useState, useEffect } from 'react';



export const useFetchAuthor = (id: string) => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch(`https://localhost:7122/api/Autor/${id}`);
        if (!response.ok) {
          throw new Error("Autor no encontrado");
        }
        const data: Author = await response.json();
        setAuthor(data);
      } catch (error) {
        setError(error as Error);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  return { author, loading, error };
};
