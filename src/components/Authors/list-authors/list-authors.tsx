"use client";

import { motion } from "framer-motion";
import Loader from "@/components/common/Loader";
import { useGetAuthors } from "@/hooks/authors/useGetAuthors";
import { Snippet } from "@nextui-org/snippet";
import Image from "next/image";
import { Chip } from "@nextui-org/react";


const TableAuthors = () => {
  const { autores, loading, error } = useGetAuthors();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 text-center rounded-[10px] bg-indigo-400 text-white px-7.5  shadow-1 dark:bg-gray-7 dark:shadow-card sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              ID
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Imagen
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nombre
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Apellido
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nacimiento
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Estado
            </h5>
          </div>
        </div>

        {autores.map((autor, key) => (
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
            className={`grid grid-cols-3 sm:grid-cols-6 ${
              key === autores.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={autor.autorLibroGuid}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
            <Snippet
                codeString={autor.autorLibroGuid}
                hideSymbol
                hideCopyButton={false}
                //@ts-ignore
                copyButtonProps={{ auto: true }}
              >
                Copiar Guid
              </Snippet>
              <p className="text-uno dark:text-dos"></p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <Image
                src={
                  autor.imagenBase64
                    ? `data:image/jpeg;base64,${autor.imagenBase64}`
                    : "/images/notImage.png"
                }
                alt={autor.nombre}
                width={88}
                height={88}
                className="rounded-md"
                objectFit="contain"
              
              />
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{autor.nombre}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{autor.apellido}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {new Date(autor.fechaNacimiento).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <Chip color="success">
                Activo  
              </Chip>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TableAuthors;
