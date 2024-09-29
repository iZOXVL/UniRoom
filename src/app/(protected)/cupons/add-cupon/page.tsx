import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AddCuponForm from "@/components/Cupons/add-cupon/add-cupon";

export const metadata: Metadata = {
  title: "NextBook"
};

const AddCuponPage = () => {
  return (
      <AddCuponForm />
  );
};

export default AddCuponPage;
