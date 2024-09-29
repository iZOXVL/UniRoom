"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@nextui-org/react";

const AddLibroForm = () => {
    const [titulo, setTitulo] = useState("");
    const [fechaPublicacion, setFechaPublicacion] = useState("");
    const [autorLibro, setAutorLibro] = useState("");
    const [precio, setPrecio] = useState<number | string>("");
    const [portada, setPortada] = useState<File | null>(null);
    const [autores, setAutores] = useState<{ autorLibroGuid: string; nombre: string; apellido: string; }[]>([]);
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAutores = async () => {
            try {
                const response = await fetch("https://localhost:7122/api/Autor");
                const data = await response.json();
                setAutores(data);
            } catch (error) {
                console.error("Error fetching authors:", error);
            }
        };

        fetchAutores();
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPortada(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!portada) {
            toast({
                title: "Error",
                description: "Por favor, sube una imagen.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        const formData = new FormData();
        formData.append("Titulo", titulo);
        formData.append("FechaPublicacion", new Date(fechaPublicacion).toISOString());
        formData.append("AutorLibro", autorLibro);
        formData.append("Precio", precio.toString());
        formData.append("Portada", portada);

        setIsLoading(true);

        try {
            const response = await fetch("https://localhost:7297/api/LibroMaterial", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast({
                    title: "Guardado!",
                    description: "El libro se guardó correctamente.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setTitulo("");
                setFechaPublicacion("");
                setAutorLibro("");
                setPrecio("");
                setPortada(null);
            } else {
                toast({
                    title: "Error",
                    description: "Hubo un problema al guardar el libro.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un problema al guardar el libro.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Breadcrumb pageName="Agregar libro" />
            <div className="flex flex-col gap-9">
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                        <h3 className="font-medium text-dark dark:text-white">
                            Ingresa los datos del libro
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="block text-body-sm font-medium text-dark dark:text-white">
                                    Título del Libro
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ingrese el título del libro"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    className="mt-5 w-full rounded-[7px] bg-slate-50 border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="block text-body-sm font-medium text-dark dark:text-white">
                                    Autor
                                </label>
                                <select
                                    value={autorLibro}
                                    onChange={(e) => setAutorLibro(e.target.value)}
                                    className="mt-5 w-full rounded-[7px] bg-slate-50 border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                                    required
                                >
                                    <option value="">Seleccione un autor</option>
                                    {autores.map((autor) => (
                                        <option key={autor.autorLibroGuid} value={autor.autorLibroGuid}>
                                            {autor.nombre} {autor.apellido}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="block text-body-sm font-medium text-dark dark:text-white">
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    placeholder="Ingrese el precio del libro"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    className="mt-5 w-full rounded-[7px] bg-slate-50 border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <label className="block text-body-sm font-medium text-dark dark:text-white mb-5">
                                    Fecha de publicación
                                </label>
                                <DatePickerOne setFechaNacimiento={setFechaPublicacion} />
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <label className="block text-body-sm font-medium text-dark dark:text-white mb-3">
                                Portada
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
                                "Agregar libro"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddLibroForm;
