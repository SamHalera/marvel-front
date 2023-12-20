import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import baseUrl from "../api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//components
import ModalAuth from "../components/ModalAuth";
import PaginationAltern from "../components/PaginationAltern";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import Results from "../components/Results";
import ComicComponent from "../components/ComicComponent";

const Comics = ({
  handleAddFavorite,
  handleRemoveFavorite,
  truncateStr,
  addedToFavorites,
  userCookies,
  user,
  createUserCookies,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState();
  const [skip, setSkip] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  console.log("user", user);
  useEffect(() => {
    const fetchData = async () => {
      const emailQuery = user ? `&email=${user.email}` : "";
      try {
        const response = await axios.get(
          `${baseUrl}/comics?title=${title}${emailQuery}&skip=${skip}`,
        );

        setData(response.data);
        setNbPages(Math.ceil(response.data.count / 100));
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    fetchData();
  }, [title, skip, addedToFavorites]);

  return (
    <main className="comics-main mt-24">
      <section className="bg-comics mb-8  h-[50vh] bg-cover bg-scroll bg-no-repeat md:bg-fixed">
        <div className="overlay bg flex h-[50vh] w-full flex-col items-center justify-center bg-black bg-opacity-80 p-4">
          <h1 className=" text-center text-4xl font-bold uppercase text-white md:text-5xl">
            Find your favorite <span className="red">Comic</span>
          </h1>
          <SearchBar
            value={title}
            setValue={setTitle}
            setSkip={setSkip}
            label="comic"
          />
        </div>
      </section>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ModalAuth
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            openModal={openModal}
            createUserCookies={createUserCookies}
          />

          <div className="container m-auto p-5">
            <div className="list-container">
              <section className="list comics-list mt-10 flex flex-col flex-wrap items-center justify-center gap-5">
                <div>
                  <Results data={data} />
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-5">
                  {data.results.map((result) => {
                    return (
                      <ComicComponent
                        key={result._id}
                        comic={result}
                        userCookies={userCookies}
                        handleAddFavorite={handleAddFavorite}
                        handleRemoveFavorite={handleRemoveFavorite}
                        openModal={openModal}
                        truncateStr={truncateStr}
                      />
                    );
                  })}
                </div>
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
        </>
      )}
    </main>
  );
};
export default Comics;
