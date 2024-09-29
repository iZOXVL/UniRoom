"use client";

import { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Snippet } from "@nextui-org/snippet";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Loader from "@/components/common/Loader";
import { useGetCupons } from "@/hooks/cupons/useGetCupons";

const ListCupons = () => {
  const { activos, caducados, loading, error } = useGetCupons();
  const [selected, setSelected] = useState("activos");

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }
  /*@ts-ignore*/
  const renderCupones = (cupones) => (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 text-center rounded-t-[10px] bg-indigo-400 text-white px-7.5 shadow-1 dark:bg-gray-7 dark:shadow-card sm:grid-cols-5">
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
      </div>
      {/*@ts-ignore*/}
      {cupones.map((cupon) => (
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`grid grid-cols-3 sm:grid-cols-5 ${
            cupones.indexOf(cupon) === cupones.length - 1
              ? ""
              : "border-b border-stroke dark:border-dark-3"
          }`}
          key={cupon.cuponCode}
        >
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <Snippet
              codeString={cupon.cuponCode}
              hideSymbol
              hideCopyButton={false}
              /*@ts-ignore*/
              copyButtonProps={{ auto: true }}
            >
             {cupon.cuponCode}
            </Snippet>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">{cupon.porcentajeDescuento}%</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">${cupon.descuentoMinimo}</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">
              {new Date(cupon.fechaExpiracion).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">${cupon.topeDescuento}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      <div className="flex w-full flex-col ">
        <Tabs
          aria-label="Opciones"
          variant="underlined"
          color="default"
          selectedKey={selected}
          /*@ts-ignore*/
          onSelectionChange={setSelected}
        >
          <Tab key="activos" title="Activos">
            <Card>
              <CardBody className="bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                {renderCupones(activos)}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="caducados" title="Caducados">
            <Card>
              <CardBody className="bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                {renderCupones(caducados)}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default ListCupons;
