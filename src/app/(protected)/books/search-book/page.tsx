import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SearchBook from "@/components/Books/search-book/search-book";

export const metadata: Metadata = {
  title: "NextBook"
};

const SearchBookPage = () => {
  return (
      <SearchBook />
  );
};

export default SearchBookPage;
