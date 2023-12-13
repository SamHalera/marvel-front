import { useParams, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import baseUrl from "../api";
import Loader from "../components/Loader";

const Character = ({
  user,
  userCookies,
  handleAddFavorite,
  handleRemoveFavorite,
  addedToFavorites,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.characterId;
  // const location = useLocation();
  // const { id } = location.state;
  // console.log("user id===>", user._id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/comics/${id}?userId=${user.id}`,
        );

        console.log("rersponse.data =>", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [addedToFavorites]);
  if (!userCookies) {
    return <Navigate to="/" />;
  } else {
    return isLoading ? (
      <Loader />
    ) : (
      <main className="one-character-main my-48">
        <div className="container mx-auto">
          <section className="character-wrapper">
            <h2 className="mb-9 text-center text-3xl font-bold text-white">
              {data.name}
            </h2>
            <article
              key={data.name}
              className="character flex flex-col items-center"
            >
              <div className="info-character mb-14 flex items-end justify-center gap-8">
                <img
                  className=" w-80"
                  src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                  alt=""
                />
                <div className=" w-2/5 text-xl leading-8 text-white">
                  <p className="">{data.description}</p>
                  <p className="font-bold">
                    You can find {data.name} in these beside{" "}
                    {data.comics.length} comics
                  </p>
                  <div className="favorites">
                    {data.isFavorite ? (
                      <FontAwesomeIcon
                        onClick={() => {
                          handleRemoveFavorite(data._id, "character");
                        }}
                        className="cursor-pointer text-2xl text-[#ed1d24]"
                        icon="fa-solid fa-star"
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => {
                          handleAddFavorite(data._id, "character");
                        }}
                        className="cursor-pointer text-2xl text-white"
                        icon="fa-regular fa-star"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="list-of-comics flex w-4/5 flex-nowrap overflow-x-scroll">
                {data.comics.map((comic) => {
                  return (
                    <Link
                      to={`/comic/${comic._id}`}
                      key={comic._id}
                      className=" w-60 shrink-0 hover:opacity-50"
                    >
                      <img
                        className="mb-2"
                        src={`${comic.thumbnail.path}/standard_fantastic.${data.thumbnail.extension}`}
                        alt=""
                      />
                      <h3 className="text-center text-white">{comic.title}</h3>
                    </Link>
                  );
                })}
              </div>
            </article>
          </section>
        </div>
      </main>
    );
  }
};
export default Character;
