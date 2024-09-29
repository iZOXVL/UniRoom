import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ListBooks from "@/components/Books/list-books/list-books";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "NextBook"
};

const ListBooksPage = () => {
  return (
    <>
    <Breadcrumb pageName="Lista de libros" />
      <ListBooks />
    </>  
  );
};

export default ListBooksPage;
