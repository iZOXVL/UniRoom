import React from "react";
import { Metadata } from "next";
import AddAutorForm from "@/components/Authors/add-author/add-author";

export const metadata: Metadata = {
  title: "NextBook"
};

const AddAuthorPage = () => {
  return (
      <AddAutorForm />
  );
};

export default AddAuthorPage;
