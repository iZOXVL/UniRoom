import { useState } from "react";
import { useToast } from "@chakra-ui/react";

interface AuthorData {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  imagenBase64: string | undefined;
}

const useAddAuthor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const addAuthor = async (data: AuthorData) => {
    setIsLoading(true);
    const { nombre, apellido, fechaNacimiento, imagenBase64 } = data;

    try {
      const response = await fetch("https://localhost:7122/api/Autor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, fechaNacimiento, imagenBase64 }),
      });

      if (response.ok) {
        toast({
          title: "Guardado!",
          description: "El autor se guardó correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Hubo un problema al guardar el autor.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al guardar el autor.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { addAuthor, isLoading };
};

export default useAddAuthor;
