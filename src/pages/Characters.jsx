import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import baseUrl from "../api";

//components
// import Pagination from "../components/Pagination";
import PaginationAltern from "../components/PaginationAltern";
import Loader from "../components/Loader";

//assets

const Characters = ({
  handleAddFavorite,
  handleRemoveFavorite,
  addedToFavorites,
  user,
  truncateStr,
  userCookies,
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
      const emailQuery = user ? `&email=${user.email}` : "";
      try {
        const response = await axios.get(
          `${baseUrl}?name=${name}${emailQuery}&skip=${skip}`,
        );

        setData(response.data);
        setNbPages(Math.ceil(response.data.count / 100));

        setIsLoading(false);
      } catch (error) {
        console.log(error, "<=====message error");
      }
    };

    fetchData();
  }, [name, skip, addedToFavorites]);

  // console.log("userCookies==>", userCookies);

  return (
    <main className="characters-main">
      <section className="bg-img bg-settings">
        <div className="overlay bg flex h-[40vh] w-full items-center justify-center bg-black bg-opacity-60"></div>
      </section>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="container m-auto px-4">
          <div className="list-container">
            <div className="search-bar m-auto flex w-2/3 flex-col items-center gap-5 py-8">
              <span className="mb-5 mt-5 text-3xl text-white">
                Find your favorite heroe
              </span>
              <div className="input-wrapper">
                <input
                  className=" border border-solid border-red-500 bg-transparent  px-5  py-2 text-xl text-white"
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
            <h2 className="results-title text-3xl font-bold text-white">
              Results: {data.count}
            </h2>

            <section className="list characters-list mt-10 flex flex-wrap justify-center gap-5">
              {data.results.map((result) => {
                return (
                  <article
                    key={result._id}
                    className="item character-item my-5 flex w-1/2 flex-col gap-4 md:w-1/4 lg:w-1/6"
                  >
                    <Link
                      className="image-wrapper"
                      to={`/comics/${result._id}`}
                    >
                      <img
                        className="  h-64 w-full object-cover object-center"
                        src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                        alt=""
                      />
                    </Link>
                    <h2 className="text-2xl text-white">{result.name}</h2>
                    <div className="favorites z-10">
                      {result.isFavorite ? (
                        <FontAwesomeIcon
                          className="cursor-pointer text-2xl text-[#ed1d24]"
                          onClick={() => {
                            handleRemoveFavorite(result._id, "character");
                          }}
                          icon="fa-solid fa-star"
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="cursor-pointer text-2xl text-white"
                          onClick={() => {
                            handleAddFavorite(result._id, "character");
                          }}
                          icon="fa-regular fa-star"
                        />
                      )}
                    </div>
                    <p className="text-white">
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
              // token={user.token}
            />
          </div>
        </div>
      )}
    </main>

    //
  );
};
export default Characters;
