import { Cupon } from '@/types/Cupon';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

export const useAddCupon = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const toast = useToast();

  const addCupon = async (cuponData: Cupon) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://localhost:7162/api/Cupones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cuponData),
      });

      if (response.ok) {
        toast({
          title: "Guardado!",
          description: "El cupón se guardó correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const errorResponse = await response.json();
        toast({
          title: "Error",
          description: errorResponse.message || "Hubo un problema al guardar el cupón.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        throw new Error(errorResponse.message || "Server responded with an error");
      }
    } catch (error) {
      setError(error as Error);
      toast({
        title: "Error",
        description: "Hubo un problema al guardar el cupón.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { addCupon, isLoading, error };
};
