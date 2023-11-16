import { useState } from "react";
import { Link } from "react-router-dom";

const Pagination = ({ data, nbPages, setSkip }) => {
  //   const handleClickOnPage = (limit, page) => {};
  const pageArray = [];
  for (let i = 0; i < nbPages; i++) {
    pageArray.push(i + 1);
  }

  return (
    <div className="pagination">
      {pageArray.map((page) => {
        const skip = page * data.limit - data.limit;
        return (
          <span
            onClick={() => {
              console.log("HEY CLICK");
              setSkip(page * data.limit - data.limit);
            }}
            key={page}
            className="page"
          >
            {page}
          </span>
          //   <Link to={`/${skip}`} />
        );
      })}
    </div>
  );
};
export default Pagination;

{
  /* <span
onClick={() => {
  console.log(data.limit * page - data.limit);
  setPage(data.limit * page - data.limit);
}}
key={i + 1}
className="page"
>
{i + 1}
</span> */
}
