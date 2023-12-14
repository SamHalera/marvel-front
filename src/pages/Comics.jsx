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
    fetchData();
  }, [title, skip, addedToFavorites]);

  return isLoading ? (
    <Loader />
  ) : (
    <main className="comics-main mt-24">
      <ModalAuth
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        openModal={openModal}
        createUserCookies={createUserCookies}
      />
      <SearchBar
        setValue={setTitle}
        value={title}
        setSkip={setSkip}
        label="comic"
      />

      <div className="container m-auto p-5">
        <div className="list-container">
          <Results data={data} />

          <section className="list comics-list mt-10 flex flex-wrap justify-center gap-5">
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
};
export default Comics;
