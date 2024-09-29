import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SearchAuthor from "@/components/Authors/search-author/search-author";

export const metadata: Metadata = {
  title: "NextBook"
};

const SearchAuthorPage = () => {
  return (
      <SearchAuthor />
  );
};

export default SearchAuthorPage;
