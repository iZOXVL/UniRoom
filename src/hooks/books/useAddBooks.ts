import { useState, useEffect } from 'react';
import { Libro } from '@/types/Books';


export const useAddBook = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await fetch("https://localhost:7297/api/LibroMaterial");
        if (!response.ok) {
          throw new Error("Error fetching libros");
        }
        const data: Libro[] = await response.json();
        setLibros(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibros();
  }, []);

  return { libros, loading, error };
};
