import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import baseUrl from "../api";

//components
// import Pagination from "../components/Pagination";
import PaginationAltern from "../components/PaginationAltern";

//assets

const Characters = ({
  handleAddFavorite,
  handleRemoveFavorite,
  addedToFavorites,
  token,
  truncateStr,
  emailCookie,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //states for query
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState();
  const [skip, setSkip] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}?name=${name}&email=${emailCookie}`
        );

        setData(response.data);
        setNbPages(Math.ceil(response.data.count / 100));

        setIsLoading(false);
      } catch (error) {
        console.log(error.response, "message error");
      }
    };

    fetchData();
  }, [name, skip, addedToFavorites]);

  if (!token) {
    return <Navigate to="/signup" />;
  } else {
    return (
      <main className="characters-main">
        <section className="bg-img bg-settings">
          <div className="overlay"></div>
        </section>

        {isLoading ? (
          <div className="loader">LOADING...</div>
        ) : (
          <div className="container">
            <div className="list-container">
              <div className="search-bar">
                <span>Find your favorite heroe</span>
                <div className="input-wrapper">
                  <input
                    onChange={(event) => {
                      setName(event.target.value);

                      setSkip(1);
                    }}
                    type="text"
                    id="name"
                    value={name}
                  />
                </div>
              </div>
              <h2 className="results-title">Results: {data.count}</h2>

              <section className="list characters-list">
                {data.results.map((result) => {
                  return (
                    <article key={result._id} className="item character-item">
                      <Link
                        className="image-wrapper"
                        to={`/comics/${result._id}`}
                      >
                        <img
                          src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                          alt=""
                        />
                      </Link>
                      <h2>{result.name}</h2>
                      <div className="favorites">
                        {result.isFavorite ? (
                          <i
                            onClick={() => {
                              handleRemoveFavorite(result._id, "character");
                            }}
                            className="fas fa-star"
                          ></i>
                        ) : (
                          <i
                            onClick={() => {
                              handleAddFavorite(result._id, "character");
                            }}
                            className="far fa-star"
                          ></i>
                        )}
                      </div>
                      <p>
                        {result.description &&
                          truncateStr(result.description, 100)}
                      </p>
                    </article>
                  );
                })}
              </section>
              <PaginationAltern
                data={{ ...data }}
                setData={setData}
                setIsLoading={setIsLoading}
                page={page}
                setPage={setPage}
                nbPages={nbPages}
                setSkip={setSkip}
                apiUrl={baseUrl}
                token={token}
              />
            </div>
          </div>
        )}
      </main>

      //
    );
  }
};
export default Characters;
