import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import baseUrl from "../api";
import ModalAuth from "../components/ModalAuth";
//components
// import Pagination from "../components/Pagination";
import PaginationAltern from "../components/PaginationAltern";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import Results from "../components/Results";
import CharacterComponent from "../components/CharacterComponent";

//assets

const Characters = ({
  handleAddFavorite,
  handleRemoveFavorite,
  addedToFavorites,
  user,
  truncateStr,
  userCookies,
  createUserCookies,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  //states for query
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState();
  const [skip, setSkip] = useState(1);

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const emailQuery = user ? `&email=${user.email}` : "";
      try {
        const response = await axios.get(
          `${baseUrl}/characters?name=${name}${emailQuery}&skip=${skip}`,
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
          <ModalAuth
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            openModal={openModal}
            createUserCookies={createUserCookies}
          />
          <div className="list-container">
            <SearchBar
              value={name}
              setValue={setName}
              setSkip={setSkip}
              label="heroe"
            />
            <Results data={data} />

            <section className="list characters-list mt-10 flex flex-wrap justify-center gap-5">
              {data.results.map((result) => {
                return (
                  <CharacterComponent
                    key={result._id}
                    character={result}
                    userCookies={userCookies}
                    handleAddFavorite={handleAddFavorite}
                    handleRemoveFavorite={handleRemoveFavorite}
                    openModal={openModal}
                    truncateStr={truncateStr}
                  />
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
