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
    <main className=" mt-16">
      <section className="bg-img mb-8  h-[50vh] bg-cover bg-scroll bg-no-repeat md:bg-fixed">
        <div className="overlay bg flex h-[50vh] w-full flex-col items-center justify-center bg-black bg-opacity-80 p-4">
          <h1 className="text-center text-4xl  font-bold uppercase text-white md:text-5xl">
            Find your favorite <span className="red">Heroe</span>
          </h1>
          <SearchBar
            value={name}
            setValue={setName}
            setSkip={setSkip}
            label="heroe"
          />
        </div>
      </section>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto my-7 px-4">
          <ModalAuth
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            openModal={openModal}
            createUserCookies={createUserCookies}
          />
          <div className="list-container">
            <section className="mt-10 flex flex-col items-center justify-center gap-5">
              <div>
                <Results data={data} />
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-5">
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
              </div>
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
