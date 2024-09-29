import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ListCupons from "@/components/Cupons/list-cupons/list-cupons";
import SearchCupon from "@/components/Cupons/search-cupon/search-cupon";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "NextBook"
};

const SearchCuponPage = () => {
  return (
    <>
    <Breadcrumb pageName="Buscar Cupón" />
    <SearchCupon />
    </>
     
  );
};

export default SearchCuponPage;
