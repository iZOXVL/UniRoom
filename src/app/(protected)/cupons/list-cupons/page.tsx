import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ListCupons from "@/components/Cupons/list-cupons/list-cupons";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "NextBook"
};

const ListCuponsPage = () => {
  return (
    <>
    <Breadcrumb pageName="Lista de cupones" />
     <ListCupons />
     </>
  );
};

export default ListCuponsPage;
