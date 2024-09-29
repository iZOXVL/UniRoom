import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SearchOrder from "@/components/Orders/search-order/search-order";

export const metadata: Metadata = {
  title: "NextBook"
};

const SearchCuponPage = () => {
  return (
    <>
    <Breadcrumb pageName="Buscar orden" />
    <SearchOrder />
    </>
     
  );
};

export default SearchCuponPage;
