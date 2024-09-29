import React from "react";
import { Metadata } from "next";
import ListCupons from "@/components/Cupons/list-cupons/list-cupons";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ListOrders from "@/components/Orders/list-orders/list-orders";

export const metadata: Metadata = {
  title: "NextBook"
};

const ListCuponsPage = () => {
  return (
    <>
    <Breadcrumb pageName="Lista de ordenes" />
     <ListOrders />
     </>
  );
};

export default ListCuponsPage;
