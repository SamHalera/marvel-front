import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import baseUrl from "../api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//components

import PaginationAltern from "../components/PaginationAltern";
import Loader from "../components/Loader";

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
          `${baseUrl}/comics?title=${title}&email=${user.email}&skip=${skip}`,
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
      <Loader />
    ) : (
      <main className="comics-main">
        <div className="search-bar m-auto flex w-2/3 flex-col items-center gap-5 py-8">
          <span className="mb-5 mt-5 text-3xl text-white">
            Find your favorite comic {title}
          </span>
          <div className="input-wrapper">
            <input
              className=" border border-solid border-red-500 bg-transparent  px-5  py-2 text-xl text-white"
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
        <div className="container m-auto">
          <div className="list-container">
            <h2 className="results-title text-3xl font-bold text-white">
              Results: {data.count}
            </h2>
            <section className="list comics-list mt-10 flex flex-wrap justify-center gap-5">
              {data.results.map((result) => {
                return (
                  <article
                    key={result._id}
                    className="item comics-item my-5 flex h-auto w-1/6 flex-col gap-4 "
                  >
                    <img
                      className="h-52 w-52 object-cover object-center"
                      src={`${result.thumbnail.path}/standard_fantastic.${result.thumbnail.extension}`}
                      alt=""
                    />
                    <h2 className="text-2xl text-white">{result.title}</h2>
                    <p className="text-white">
                      {result.description &&
                        truncateStr(result.description, 120)}
                    </p>
                    <div className="favorites">
                      {result.isFavorite ? (
                        <FontAwesomeIcon
                          onClick={() => {
                            handleRemoveFavorite(result._id, "comic");
                          }}
                          className="cursor-pointer text-2xl text-[#ed1d24]"
                          icon="fa-solid fa-star"
                        />
                      ) : (
                        <FontAwesomeIcon
                          onClick={() => {
                            handleAddFavorite(result._id, "comic");
                          }}
                          className="cursor-pointer text-2xl text-white"
                          icon="fa-regular fa-star"
                        />
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
