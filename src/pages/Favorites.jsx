import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Favorites = ({
  baseUrl,
  displayCharacters,
  setDisplayCharacters,
  token,
  userId,
  emailCookie,
  handleRemoveFavorite,
  addedToFavorites,
  userCookies,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(userCookies);
  console.log(user.email);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/favorites?email=${user.email}`
        );

        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response, "message error");
      }
    };

    fetchData();
  }, [displayCharacters, addedToFavorites]);
  if (userCookies) {
    return isLoading ? (
      <div className="loader">LOADING</div>
    ) : (
      <main
        className={`favorites-main ${data.length === 0 ? "height-100" : ""}`}
      >
        <h1>My Favorites</h1>

        {data.length === 0 ? (
          <div className="cta">
            <h2>You don't have any favorite yet</h2>
            <h3>Give a look on these two sections:</h3>
            <div className="btn-groups">
              <Link to="/">Characters</Link>
              <Link to="/comics">Comics</Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="toggle-favorites">
              <span
                onClick={() => {
                  setDisplayCharacters("character");
                }}
                className={`${
                  displayCharacters === "character" ? "red active" : ""
                }`}
              >
                Characters
              </span>
              <span
                onClick={() => {
                  setDisplayCharacters("comic");
                }}
                className={`${
                  displayCharacters === "comic" ? "red active" : ""
                }`}
              >
                Comics
              </span>
            </div>

            <div className="container">
              <section className="list favorites-list">
                {data.map((favorite) => {
                  console.log("favorite.user=>", favorite.user);
                  console.log("userId=>", userId);
                  if (favorite.user === userId) {
                    // displayCharacters === favorite.label &&
                    if (displayCharacters === favorite.label) {
                      return (
                        <article key={favorite._id} className="item">
                          <h3>{favorite.title || favorite.name}</h3>
                          <div className="image-wrapper">
                            <img
                              src={`${favorite.thumbnail.path}.${favorite.thumbnail.extension}`}
                              alt=""
                            />
                          </div>
                          <div className="favorites">
                            <i
                              onClick={() => {
                                handleRemoveFavorite(favorite._id, "character");
                              }}
                              className="fas fa-star"
                            ></i>
                          </div>
                        </article>
                      );
                    }
                  }
                  return null;
                })}
              </section>
            </div>
          </div>
        )}
      </main>
    );
  } else {
    return <Navigate to="/" />;
  }
};
export default Favorites;
