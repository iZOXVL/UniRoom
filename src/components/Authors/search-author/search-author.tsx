// src/components/SearchAuthor.tsx
"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { useToast } from "@chakra-ui/react";
import { useFetchAuthor } from '@/hooks/authors/useSearchAuthor';
import { Snippet } from '@nextui-org/snippet';

const SearchAuthor = () => {
  const [authorId, setAuthorId] = useState<string>("");
  const [searchId, setSearchId] = useState<string>("");
  const { author, loading, error } = useFetchAuthor(searchId);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorId) {
      toast({
        title: "Error",
        description: "Por favor, ingrese un ID de autor",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setSearchId(authorId);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Buscar Autor" />
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <form onSubmit={handleSubmit} className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="block text-body-sm font-medium text-dark dark:text-white">
                  ID del Autor
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el ID del autor"
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                  className="mt-5 w-full rounded-[7px] bg-slate-50 border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 w-full inline-flex justify-center rounded-md bg-primary px-10 py-4 text-center text-white hover:bg-opacity-90"
            >
              Buscar Autor
            </button>
          </form>
        </div>
        {loading && <div className="text-center text-sm text-gray-500">Cargando resultados...</div>}
        {error && <div className="text-center text-sm text-red-500">Error: {error.message}</div>}
        {author && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card"
          >
            <div className="flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-4 text-center rounded-[10px] bg-indigo-400 text-white shadow-1 dark:bg-gray-7 dark:shadow-card">
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Imagen</h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Nombre</h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Apellido</h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Nacimiento</h5>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 border-b border-stroke dark:border-dark-3">
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <Image
                    src={author.imagenBase64 ? `data:image/jpeg;base64,${author.imagenBase64}` : "/images/notImage.png"}
                    alt={author.nombre}
                    width={100}
                    height={100}
                    className="mx-auto rounded-xl mt-6"
                    objectFit="cover"
                  />
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white mt-12">{author.nombre}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white mt-12">{author.apellido}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white mt-12">
                    {new Date(author.fechaNacimiento).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default SearchAuthor;
