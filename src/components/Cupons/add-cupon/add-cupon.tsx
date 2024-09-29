"use client";

import { useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useAddCupon } from '@/hooks/cupons/useAddCupon';
import { Spinner } from '@nextui-org/spinner';

const AddCuponForm = () => {
  const [cuponCode, setCuponCode] = useState("");
  const [porcentajeDescuento, setPorcentajeDescuento] = useState(0);
  const [descuentoMinimo, setDescuentoMinimo] = useState(0);
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [topeDescuento, setTopeDescuento] = useState(0);
  const { addCupon, isLoading } = useAddCupon();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCupon({
      cuponCode,
      porcentajeDescuento,
      descuentoMinimo,
      fechaExpiracion,
      topeDescuento
    });

    if (!isLoading) {  // Reset fields only if not loading
      setCuponCode("");
      setPorcentajeDescuento(0);
      setDescuentoMinimo(0);
      setFechaExpiracion("");
      setTopeDescuento(0);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Agregar cupón" />
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
              Ingresa los datos del cupón
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
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

              <div className="w-full xl:w-1/2">
                <label className="block text-body-sm font-medium text-dark dark:text-white">
                  Porcentaje de descuento
                </label>
                <input
                  type="number"
                  placeholder="Ingrese el porcentaje de descuento"
                  value={porcentajeDescuento}
                  onChange={(e) => setPorcentajeDescuento(parseFloat(e.target.value))}
                  className="mt-5 w-full rounded-[7px] bg-slate-50 border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="block text-body-sm font-medium text-dark dark:text-white">
                  Descuento mínimo
                </label>
                <input
                  type="number"
                  placeholder="Ingrese el descuento mínimo"
                  value={descuentoMinimo}
                  onChange={(e) => setDescuentoMinimo(parseFloat(e.target.value))}
                  className="mt-5 w-full rounded-[7px] bg-slate-50 border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="block text-body-sm font-medium text-dark dark:text-white">
                  Tope de descuento
                </label>
                <input
                  type="number"
                  placeholder="Ingrese el tope de descuento"
                  value={topeDescuento}
                  onChange={(e) => setTopeDescuento(parseFloat(e.target.value))}
                  className="mt-5 w-full rounded-[7px] bg-slate-50 border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="mb-4.5">
              <label className="block text-body-sm font-medium text-dark dark:text-white">
                Fecha de expiración
              </label>
              <input
                type="date"
                placeholder="Ingrese la fecha de expiración"
                value={fechaExpiracion}
                onChange={(e) => setFechaExpiracion(e.target.value)}
                className="mt-5 w-full rounded-[7px] bg-slate-50 border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                required
              />
            </div>

            <button
                            type="submit"
                            className="mt-5 w-full inline-flex justify-center rounded-md bg-primary px-10 py-4 text-center text-white hover:bg-opacity-90"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner color="success"/>
                                </>
                            ) : (
                                "Agregar cupón"
                            )}
                        </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCuponForm;
