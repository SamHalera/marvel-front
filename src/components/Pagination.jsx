import { useState } from "react";

const Pagination = ({ data, nbPages }) => {
  const pageArray = [];
  for (let i = 0; i < nbPages; i++) {
    pageArray.push(
      <span key={i + 1} className="page">
        {i + 1}
      </span>
    );
  }
  return <div className="pagination">{pageArray}</div>;
};
export default Pagination;
