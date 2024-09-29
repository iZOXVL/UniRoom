import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AddLibroForm from "@/components/Books/add-book/add-book";

export const metadata: Metadata = {
  title: "NextBook"
};

const AddBookPage = () => {
  return (
      <AddLibroForm />
  );
};

export default AddBookPage;
