import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

//components
import Pagination from "../components/Pagination";

//assets

const Charachters = ({ handleClickFavorite, favorites }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [display, setDisplay] = useState(false);

  //states for query
  const [name, setName] = useState("");
  const [skip, setSkip] = useState(0);

  const [nbPages, setNbPages] = useState();

  console.log("localStorage=> ", localStorage);
  const localStorageFavorites = JSON.parse(localStorage.getItem("favorites"));
  useEffect(() => {
    const fetchData = async () => {
      console.log("INSIDE FETCHDATA");

      try {
        const response = await axios.get(
          `http://localhost:3000?name=${name}&skip=${skip}`
          // `http://localhost:3000?skip=${skip}`
        );

        console.log("data =>", response.data);
        setData(response.data);
        setNbPages(Math.ceil(response.data.count / 100));

        setIsLoading(false);
        //when data are created we scroll smoothly to the div of list
        // document.body.scrollTop = 400; // For Safari
        // document.documentElement.scrollTop = 400; // For Chrome, Firefox, IE and Opera
      } catch (error) {
        console.log(error.response, "message error");
      }
    };

    fetchData();
  }, [name, skip, favorites]);

  return (
    <main className="characters-main">
      <section className="bg-img bg-settings">
        <div className="overlay">
          <h1>Enter the Marvel Univers</h1>
        </div>
        <div className="search-bar">
          <span>Find your favorite heroe {name}</span>
          <div className="input-wrapper">
            <i className="fas fa-search"></i>
            <input
              onChange={(event) => {
                setName(event.target.value);
                setSkip("");
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
                      // state={{ id: result._id }}
                    >
                      <img
                        src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                        alt=""
                      />
                    </Link>
                    <h2>{result.name}</h2>
                    <div className="favorites">
                      {Object.keys(
                        localStorageFavorites.characters.length > 0
                      ) &&
                      localStorageFavorites.characters.includes(result._id) ? (
                        <i
                          onClick={() => {
                            handleClickFavorite(
                              result._id,
                              "remove",
                              "character"
                            );
                          }}
                          className="fas fa-star"
                        ></i>
                      ) : (
                        <i
                          onClick={() => {
                            handleClickFavorite(result._id, "add", "character");
                          }}
                          className="far fa-star"
                        ></i>
                      )}

                      {display && <span>added to favotites!</span>}
                    </div>
                    <p>{result.description && result.description}</p>
                  </article>
                );
              })}
            </section>
            <Pagination
              data={{ ...data }}
              nbPages={nbPages}
              setSkip={setSkip}
            />
          </div>
        </div>
      )}
    </main>
  );
};
export default Charachters;
