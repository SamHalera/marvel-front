import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import baseUrl from "../api";

//components
// import Pagination from "../components/Pagination";
import PaginationAltern from "../components/PaginationAltern";
import Login from "./Login";
import Form from "../components/Form";

//assets

const Charachters = ({
  handleAddFavorite,
  handleRemoveFavorite,
  addedToFavorites,
  token,
  handleToken,
  handleId,
  truncateStr,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [display, setDisplay] = useState(false);

  //states for query
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState();
  const [skip, setSkip] = useState(1);

  console.log("token=>", token);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      console.log("INSIDE FETCHDATA");

      try {
        const response = await axios.get(`${baseUrl}?name=${name}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("data =>", response.data);
        setData(response.data);
        setNbPages(Math.ceil(response.data.count / 100));

        setIsLoading(false);
      } catch (error) {
        console.log(error.response, "message error");
      }
    };

    fetchData();
  }, [name, skip, addedToFavorites]);

  console.log("tok", token);
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return (
      <main className="characters-main">
        <section className="bg-img bg-settings">
          <div className="overlay">
            <h1>Enter the Marvel Univers</h1>
          </div>
          <div className="search-bar">
            <span>Find your favorite heroe</span>
            <div className="input-wrapper">
              <i className="fas fa-search"></i>
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
        </section>

        {isLoading ? (
          <div className="loader">LOADING</div>
        ) : (
          <div className="container">
            <div className="list-container">
              <h2 className="results-title">Results: {data.count}</h2>

              <section className="list characters-list">
                {data.results.map((result, index) => {
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

                        {display && <span>added to favotites!</span>}
                      </div>
                      <p>
                        {result.description &&
                          truncateStr(result.description, 150)}
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
export default Charachters;
