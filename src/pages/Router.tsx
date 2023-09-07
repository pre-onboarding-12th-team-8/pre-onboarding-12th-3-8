import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { SearchResult } from "./SearchResult";
import { NotFound } from "./NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
