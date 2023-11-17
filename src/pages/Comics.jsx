import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import baseUrl from "../api";

//components

import PaginationAltern from "../components/PaginationAltern";

const Comics = ({
  handleUserFavorites,
  setStorageComicFavorites,
  storageComicFavorites,
  truncateStr,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState();
  const [skip, setSkip] = useState(1);

  console.log("localStorage from setLocalStorage=> ", localStorage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/comics?title=${title}`);
        console.log("data =>", response.data);
        setData(response.data);
        setNbPages(Math.ceil(response.data.count / 100));
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [title, skip]);
  return isLoading ? (
    <div className="loader">LOADING</div>
  ) : (
    <main className="comics-main">
      <div className="search-bar">
        <span>Find your favorite comic {title}</span>
        <div className="input-wrapper">
          <i className="fas fa-search"></i>
          <input
            onChange={(event) => {
              setTitle(event.target.value);
              setSkip("");
            }}
            type="text"
            id="name"
            value={title}
          />
        </div>
      </div>
      <div className="container">
        <div className="list-container">
          <h2 className="results-title">Results: {data.count}</h2>
          <section className="list comics-list">
            {data.results.map((result) => {
              return (
                <article key={result._id} className="item comics-item">
                  <img
                    src={`${result.thumbnail.path}/standard_fantastic.${result.thumbnail.extension}`}
                    alt=""
                  />
                  <h2>{result.title}</h2>
                  <p>
                    {result.description && truncateStr(result.description, 100)}
                  </p>
                  <div className="favorites">
                    {localStorage.length !== 0 &&
                    localStorage.comicsFavorites
                      .split(",")
                      .includes(result._id) ? (
                      <i
                        onClick={() => {
                          handleUserFavorites(result._id, "remove", "comic");
                        }}
                        className="fas fa-star"
                      ></i>
                    ) : (
                      <i
                        onClick={() => {
                          handleUserFavorites(result._id, "add", "comic");
                        }}
                        className="far fa-star"
                      ></i>
                    )}

                    {/* {display && <span>added to favotites!</span>} */}
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </div>

      <PaginationAltern
        data={{ ...data }}
        setData={setData}
        setIsLoading={setIsLoading}
        page={page}
        setPage={setPage}
        nbPages={nbPages}
        setSkip={setSkip}
        apiUrl={`${baseUrl}/comics`}
      />
    </main>
  );
};
export default Comics;
