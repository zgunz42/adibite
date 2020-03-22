import React from "react";
import TopLayout from "./TopLayout";

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => {
  return <TopLayout>{element}</TopLayout>;
};
