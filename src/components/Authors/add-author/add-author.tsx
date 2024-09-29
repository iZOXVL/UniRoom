"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { useState } from "react";
import useAddAuthor from "@/hooks/authors/useAddAuthor";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@nextui-org/spinner";

const AddAutorForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const { addAuthor, isLoading } = useAddAuthor();
  const toast = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagen) {
      toast({
        title: "Error",
        description: "Por favor, sube una imagen.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(',')[1];
      addAuthor({ nombre, apellido, fechaNacimiento, imagenBase64: base64String });
    };
    reader.readAsDataURL(imagen);

    if (!isLoading) {  // Reset fields only if not loading
      setNombre("");
      setApellido("");
      setFechaNacimiento("");
      setImagen(null);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Agregar autor" />
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
              Ingresa los datos del autor
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el nombre del autor"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full rounded-[7px] border-[1.5px] bg-slate-50 border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Apellido
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el apellido del autor"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="w-full rounded-[7px] border-[1.5px] bg-slate-50 border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-body-sm  font-medium text-dark dark:text-white">
                Fecha de nacimiento
              </label>
              <DatePickerOne setFechaNacimiento={setFechaNacimiento} />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Imagen del autor
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full cursor-pointer rounded-[7px] bg-slate-50 border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
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
                                "Agregar autor"
                            )}
                        </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAutorForm;
