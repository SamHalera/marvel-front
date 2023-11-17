import axios from "axios";

import { useState } from "react";
import { Link } from "react-router-dom";

const PaginationAltern = ({
  setData,
  setIsLoading,
  page,
  setPage,
  nbPages,
  apiUrl,
}) => {
  const handlePagination = async (value) => {
    setIsLoading(true);
    if (value <= 1) {
      value = 1;
    } else if (value >= nbPages) {
      value = nbPages;
    }
    try {
      const response = await axios.get(`${apiUrl}?skip=${value}`);
      console.log(`${apiUrl}?skip=${value}`);
      console.log(response.data);
      setData(response.data);
      setPage(value);
      setIsLoading(false);
    } catch (error) {
      console.log(`${apiUrl}?skip=${value}`);
      console.log(error.response, "message error");
    }
  };

  return (
    <div className="pagination-wrapper">
      <div className="pagination">
        {page <= 1 ? (
          <span className="disabled">prev</span>
        ) : (
          <span
            className="next"
            onClick={() => {
              handlePagination(page - 1);
            }}
          >
            prev
          </span>
        )}

        {/* //which value for input ?? */}
        <form
          onSubmit={() => {
            handlePagination(page);
          }}
        >
          <input
            onChange={(event) => {
              let value = event.target.value;
              if (event.target.value <= 0) {
                value = 1;
              } else if (event.target.value > nbPages) {
                value = nbPages;
              }
              setPage(event.target.value);
            }}
            type="number"
            name="page"
            id=""
            value={page <= 1 ? 1 : page >= nbPages ? nbPages : page}
          />
          <input type="submit" value="GO" />
        </form>
        <span>OF</span>
        <span>{nbPages}</span>

        {page === nbPages ? (
          <span className="disabled">next</span>
        ) : (
          <span
            className="next"
            onClick={() => {
              handlePagination(page + 1);
            }}
          >
            next
          </span>
        )}
      </div>
    </div>
  );
};
export default PaginationAltern;
