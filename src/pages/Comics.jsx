import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import baseUrl from "../api";

//components

import PaginationAltern from "../components/PaginationAltern";

const Comics = ({
  handleAddFavorite,
  handleRemoveFavorite,
  truncateStr,
  addedToFavorites,
  userCookies,
  user,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState();
  const [skip, setSkip] = useState(1);

  console.log("user", user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/comics?title=${title}&email=${user.email}`
        );

        setData(response.data);
        setNbPages(Math.ceil(response.data.count / 100));
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [title, skip, addedToFavorites]);

  if (!userCookies) {
    return <Navigate to="/login" />;
  } else {
    return isLoading ? (
      <div className="loader">LOADING</div>
    ) : (
      <main className="comics-main">
        <div className="search-bar">
          <span>Find your favorite comic {title}</span>
          <div className="input-wrapper">
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
                      {result.description &&
                        truncateStr(result.description, 100)}
                    </p>
                    <div className="favorites">
                      {result.isFavorite ? (
                        <i
                          onClick={() => {
                            handleRemoveFavorite(result._id, "comic");
                          }}
                          className="fas fa-star"
                        ></i>
                      ) : (
                        <i
                          onClick={() => {
                            handleAddFavorite(result._id, "comic");
                          }}
                          className="far fa-star"
                        ></i>
                      )}
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
          userCookies={userCookies}
        />
      </main>
    );
  }
};
export default Comics;
