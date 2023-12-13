import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../components/Loader";

const Favorites = ({
  baseUrl,
  displayCharacters,
  setDisplayCharacters,
  handleRemoveFavorite,
  addedToFavorites,
  userCookies,
  user,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log("email", user.email);

  console.log("displayCharacters==>", displayCharacters);
  // console.log("data", data.length);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/favorites?email=${user.email}&id=${user._id}`,
        );

        console.log("response data====>", response.data);
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
      <Loader />
    ) : (
      <main className="favorites-main h-screen">
        <h1 className=" my-32 text-center text-4xl font-bold text-white">
          My Favorites
        </h1>

        {data.length === 0 ? (
          <div className="cta mx-auto my-10 flex w-[80%] flex-col gap-5 text-center">
            <h2 className="text-2xl text-white">
              You don't have any favorite yet
            </h2>
            <h3 className="text-xl text-white">
              Give a look on these two sections:
            </h3>
            <div className="btn-groups mt-10">
              <Link
                className=" boder m-8 cursor-pointer border border-solid border-[#ed1d24] bg-[#ed1d24] p-3 text-white"
                to="/"
              >
                Characters
              </Link>
              <Link
                className=" boder m-8 cursor-pointer border border-solid border-[#ed1d24] bg-[#ed1d24] p-3 text-white"
                to="/comics"
              >
                Comics
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="toggle-favorites flex items-center justify-center gap-8 text-2xl">
              <span
                onClick={() => {
                  setDisplayCharacters("character");
                }}
                className={`cursor-pointer ${
                  displayCharacters === "character"
                    ? "red active"
                    : "text-white"
                }`}
              >
                Characters
              </span>
              <span
                onClick={() => {
                  setDisplayCharacters("comic");
                }}
                className={`cursor-pointer ${
                  displayCharacters === "comic" ? "red active" : "text-white"
                }`}
              >
                Comics
              </span>
            </div>

            <div className="container m-auto">
              <section className="list favorites-list mt-10 flex flex-wrap justify-center gap-5">
                {data.map((favorite) => {
                  // console.log("favorite.user=>", favorite.user);
                  // console.log("userId=>", user.id);
                  if (favorite.user === user._id) {
                    // displayCharacters === favorite.label &&
                    if (displayCharacters === favorite.label) {
                      console.log("favorite id====>", favorite._id);
                      return (
                        <article
                          key={favorite._id}
                          className="item my-5 flex w-1/2 flex-col gap-4 md:w-1/4 lg:w-1/6"
                        >
                          <div className="image-wrapper">
                            <img
                              className=" h-72 w-64 object-cover object-center"
                              src={`${favorite.thumbnail.path}.${favorite.thumbnail.extension}`}
                              alt=""
                            />
                          </div>
                          <h3 className="text-xl text-white">
                            {favorite.title || favorite.name}
                          </h3>
                          <div className="favorites">
                            <FontAwesomeIcon
                              onClick={() => {
                                handleRemoveFavorite(
                                  favorite._id,
                                  favorite.label,
                                );
                              }}
                              className="cursor-pointer text-2xl text-[#ed1d24]"
                              icon="fa-solid fa-star"
                            />
                            {/* <i
                              onClick={() => {
                                handleRemoveFavorite(favorite._id, "character");
                              }}
                              className="fas fa-star"
                            ></i> */}
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
