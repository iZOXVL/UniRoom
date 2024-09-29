import { Libro } from '@/types/Books';
import { useState, useEffect } from 'react';

export const useSearchBook = (id: string) => {
  const [libro, setLibro] = useState<Libro | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLibro = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch(`https://localhost:7297/api/LibroMaterial/${id}`);
        if (!response.ok) {
          throw new Error("Libro no encontrado");
        }
        const data: Libro = await response.json();
        setLibro(data);
      } catch (error) {
        setError(error as Error);
        setLibro(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLibro();
  }, [id]);

  return { libro, loading, error };
};
