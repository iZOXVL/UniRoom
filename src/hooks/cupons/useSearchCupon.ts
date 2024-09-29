import { ApiResponse } from '@/types/ApiResponse';
import { Cupon } from '@/types/Cupon';
import { useState, useEffect } from 'react';



export const useSearchCupon = (code: string) => {
  const [cupon, setCupon] = useState<Cupon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCupon = async () => {
      if (!code) return;
      setLoading(true);
      try {
        const response = await fetch(`https://localhost:7162/api/Cupones/getbycode/${code}`);
        if (!response.ok) {
          throw new Error("Cupón no encontrado");
        }
        const data: ApiResponse = await response.json();
        if (data.isSuccess) {
          //@ts-ignore
          setCupon(data.result);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        setError(error as Error);
        setCupon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCupon();
  }, [code]);

  return { cupon, loading, error };
};
