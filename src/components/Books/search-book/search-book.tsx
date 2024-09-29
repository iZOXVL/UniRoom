"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useToast } from "@chakra-ui/react";
import { useSearchBook } from '@/hooks/books/useSearchBook';
import { Snippet } from '@nextui-org/snippet';

const SearchBook = () => {
  const [libroId, setLibroId] = useState<string>("");
  const [searchId, setSearchId] = useState<string>("");
  const { libro, loading, error } = useSearchBook(searchId);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!libroId) {
      toast({
        title: "Error",
        description: "Por favor, ingrese un ID de libro.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setSearchId(libroId);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Buscar libro" />
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <form onSubmit={handleSubmit} className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="block text-body-sm font-medium text-dark dark:text-white">
                  ID del Libro
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el ID del libro"
                  value={libroId}
                  onChange={(e) => setLibroId(e.target.value)}
                  className="mt-5 w-full rounded-[7px] bg-slate-50 border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 w-full inline-flex justify-center rounded-md bg-primary px-10 py-4 text-center text-white hover:bg-opacity-90"
            >
              Buscar libro
            </button>
          </form>
        </div>
        {loading && <div className="text-center text-gray-500">Cargando resultados...</div>}
        {error && <div className="text-center text-red-500">Error: {error.message}</div>}
        {libro && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card"
          >
            <div className="flex flex-col">
              <div className="grid grid-cols-3 text-center rounded-[10px] bg-indigo-400 text-white shadow-1 dark:bg-gray-7 dark:shadow-card sm:grid-cols-5">
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Título
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Fecha de Publicación
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Autor
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Precio
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Portada
                  </h5>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-dark-3">
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{libro.titulo}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {new Date(libro.fechaPublicacion).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <Snippet
                    codeString={libro.autorLibro}
                    hideSymbol
                    hideCopyButton={false}
                    //@ts-ignore
                    copyButtonProps={{ auto: true }}
                  >
                    Copiar Guid del autor
                  </Snippet>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">${libro.precio?.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  {libro.portadaBase64 && (
                    <img src={`data:image/png;base64,${libro.portadaBase64}`} alt="Portada del libro" className="w-16 h-16 object-cover" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default SearchBook;
