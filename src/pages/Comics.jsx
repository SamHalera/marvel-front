import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

//components
import Pagination from "../components/Pagination";

const Comics = ({ handleClickFavorite, favorites }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [nbPages, setNbPages] = useState();
  const [skip, setSkip] = useState(0);

  console.log("localStorage=> ", localStorage);
  const localStorageFavorites = JSON.parse(localStorage.getItem("favorites"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?title=${title}`
        );
        console.log("data =>", response.data);
        setData(response.data);
        setNbPages(Math.ceil(response.data.count / 100));
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [title, skip]);
  return isLoading ? (
    <div className="loader">LOADING</div>
  ) : (
    <main className="comics-main">
      <div className="search-bar">
        <span>Find your favorite comic {title}</span>
        <div className="input-wrapper">
          <i className="fas fa-search"></i>
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
        <section className="list comics-list">
          {data.results.map((result) => {
            return (
              <article key={result._id} className="item character-item">
                <img
                  src={`${result.thumbnail.path}/standard_fantastic.${result.thumbnail.extension}`}
                  alt=""
                />
                <h2>{result.title}</h2>
                <p>{result.description && result.description}</p>
                <div className="favorites">
                  {Object.keys(localStorageFavorites.comics.length > 0) &&
                  localStorageFavorites.comics.includes(result._id) ? (
                    <i
                      onClick={() => {
                        handleClickFavorite(result._id, "remove", "comic");
                      }}
                      className="fas fa-star"
                    ></i>
                  ) : (
                    <i
                      onClick={() => {
                        handleClickFavorite(result._id, "add", "comic");
                      }}
                      className="far fa-star"
                    ></i>
                  )}

                  {/* {display && <span>added to favotites!</span>} */}
                </div>
              </article>
            );
          })}
        </section>
      </div>
      <Pagination data={{ ...data }} nbPages={nbPages} setSkip={setSkip} />
    </main>
  );
};
export default Comics;
