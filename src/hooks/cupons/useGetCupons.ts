import { ApiResponse } from '@/types/ApiResponse';
import { Cupon } from '@/types/Cupon';
import { useState, useEffect } from 'react';

export const useGetCupons = () => {
  const [activos, setActivos] = useState<Cupon[]>([]);
  const [caducados, setCaducados] = useState<Cupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCupones = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://localhost:7162/api/Cupones");
        if (!response.ok) {
          throw new Error("Error al obtener los cupones");
        }
        const data: ApiResponse = await response.json();
        if (data.isSuccess) {
          const today = new Date();
          const activos = data.result.filter((cupon: Cupon) => new Date(cupon.fechaExpiracion) > today);
          const caducados = data.result.filter((cupon: Cupon) => new Date(cupon.fechaExpiracion) <= today);
          setActivos(activos);
          setCaducados(caducados);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCupones();
  }, []);

  return { activos, caducados, loading, error };
};
