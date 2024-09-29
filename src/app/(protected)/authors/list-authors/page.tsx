import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ListAuthors from "@/components/Authors/list-authors/list-authors";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";


export const metadata: Metadata = {
  title: "NextBook"
};

const ListAuthorsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Lista de autores" />
      <ListAuthors />
    </>
  );
};

export default ListAuthorsPage;
