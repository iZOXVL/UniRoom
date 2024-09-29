"use client";

import { useState } from 'react';
import { Badge, Chip } from "@nextui-org/react";
import { useSearchCupon } from '@/hooks/cupons/useSearchCupon';
import { motion } from "framer-motion";
import { Snippet } from "@nextui-org/snippet";
import { useToast } from '@chakra-ui/react';

const SearchCupon = () => {
  const [cuponCode, setCuponCode] = useState<string>("");
  const [searchCode, setSearchCode] = useState<string>("");
  const { cupon, loading, error } = useSearchCupon(searchCode);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cuponCode) {
      toast({
        title: "Error",
        description: "Por favor, ingrese un código de cupón",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setSearchCode(cuponCode);
    }
  };

  const getStatusBadge = (fechaExpiracion: string) => {
    const today = new Date();
    const expirationDate = new Date(fechaExpiracion);
    return expirationDate > today ? (
      <Chip color="success">Activo</Chip>
    ) : (
      <Chip color="danger">Caducado</Chip>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <form onSubmit={handleSubmit} className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="block text-body-sm font-medium text-dark dark:text-white">
                  Código del cupón
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el código del cupón"
                  value={cuponCode}
                  onChange={(e) => setCuponCode(e.target.value)}
                  className="mt-5 w-full rounded-[7px] bg-slate-50 border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 w-full inline-flex justify-center rounded-md bg-primary px-10 py-4 text-center text-white hover:bg-opacity-90"
            >
              Buscar Cupón
            </button>
          </form>
        </div>
        {loading && <div className="text-center">Cargando resultados...</div>}
        {error && <div className="text-center text-red-500">Error: {error.message}</div>}
        {cupon && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card"
          >
            <div className="flex flex-col">
              <div className="grid grid-cols-3 text-center rounded-t-[10px] bg-indigo-400 text-white shadow-1 dark:bg-gray-7 dark:shadow-card sm:grid-cols-6">
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Código</h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">% de Descuento</h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Descuento Min</h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Expira</h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Descuento Max</h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Estatus</h5>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 border-b border-stroke dark:border-dark-3">
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <Snippet
                    codeString={cupon.cuponCode}
                    hideSymbol
                    hideCopyButton={false}
                    //@ts-ignore
                    copyButtonProps={{ auto: true }}
                  >
                    {cupon.cuponCode}
                  </Snippet>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {cupon.porcentajeDescuento}%
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    ${cupon.descuentoMinimo}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    {new Date(cupon.fechaExpiracion).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">
                    ${cupon.topeDescuento}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  {getStatusBadge(cupon.fechaExpiracion)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default SearchCupon;
