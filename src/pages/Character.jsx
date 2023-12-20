import { useParams, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import baseUrl from "../api";
import Loader from "../components/Loader";
import FavoritesComponent from "../components/FavoritesComponent";
import ComicsCarousel from "../components/ComicsCarousel";

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
          `${baseUrl}/comics/${id}?userId=${user._id}`,
        );

        console.log("rersponse.data =>", response.data);
        setData(response.data);
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
            <div className="mb-9 flex items-center justify-center gap-5">
              <h2 className=" text-center text-3xl font-bold text-white">
                {data.name}
              </h2>
              <FavoritesComponent
                item={data}
                label="character"
                userCookies={userCookies}
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
              />
            </div>
            <article
              key={data.name}
              className="character flex flex-col items-center"
            >
              <div className="info-character mb-14 flex flex-col items-center justify-center gap-8  lg:flex-row lg:items-end">
                <img
                  className=" w-72 lg:w-80"
                  src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                  alt=""
                />
                <div className="w-full p-8 text-xl leading-8 text-white lg:w-2/5">
                  <p className="">{data.description}</p>
                  <p className="font-bold">
                    You can find {data.name} in these beside{" "}
                    {data.comics.length} comics
                  </p>
                </div>
              </div>
              <ComicsCarousel data={data} />
            </article>
          </section>
        </div>
      </main>
    );
  }
};
export default Character;
