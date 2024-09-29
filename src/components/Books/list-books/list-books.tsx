"use client";

import { Snippet } from "@nextui-org/snippet";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { motion } from "framer-motion";
import Loader from "@/components/common/Loader";
import { useGetBooks } from "@/hooks/books/useGetBooks";

const ListBooks = () => {
  const { libros, loading, error } = useGetBooks();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-6 text-center rounded-[10px] bg-indigo-400 text-white shadow-1 dark:bg-gray-7 dark:shadow-card">
          <div className="p-2.5 xl:p-5 col-span-1">
            <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-1">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Título</h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-1">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Publicado</h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-1">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Autor</h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-1">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Precio</h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-1">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Portada</h5>
          </div>
        </div>

        {libros.map((libro, key) => (
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
            className={`grid grid-cols-2 sm:grid-cols-6 gap-2 border-b border-stroke dark:border-dark-3 p-2.5 xl:p-5 ${
              key === libros.length - 1 ? "" : "border-b"
            }`}
            key={libro.libreriaMaterialId}
          >
            <div className="flex items-center justify-center col-span-2 sm:col-span-1">
              <Snippet
                codeString={libro.libreriaMaterialId}
                hideSymbol
                hideCopyButton={false}
                //@ts-ignore
                copyButtonProps={{ auto: true }}
              >
                Copiar Guid
              </Snippet>
            </div>
            <div className="flex items-center justify-center col-span-2 sm:col-span-1">
              <p className="text-black dark:text-white">{libro.titulo}</p>
            </div>
            <div className="flex items-center justify-center col-span-2 sm:col-span-1">
              <p className="text-black dark:text-white">
                {new Date(libro.fechaPublicacion).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center justify-center col-span-2 sm:col-span-1">
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
            <div className="flex items-center justify-center col-span-2 sm:col-span-1">
              <p className="text-black dark:text-white">${libro.precio?.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-center col-span-2 sm:col-span-1">
              {libro.portadaBase64 && (
                <img
                  src={`data:image/png;base64,${libro.portadaBase64}`}
                  alt="Portada del libro"
                  className="w-16 h-16 object-cover"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ListBooks;
