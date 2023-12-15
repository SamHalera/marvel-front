import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../components/Loader";
import baseUrl from "../api";
import FavoritesComponent from "../components/FavoritesComponent";
const Comic = ({
  user,
  userCookies,
  handleAddFavorite,
  handleRemoveFavorite,
  addedToFavorites,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  console.log("uerId==>", user._id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/comic/${id}?userId=${user._id}`,
        );

        setData(response.data);
        console.log("reponse==>", response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [addedToFavorites]);

  return !userCookies ? (
    <Navigate to="/" />
  ) : isLoading ? (
    <Loader />
  ) : (
    <main className="container mx-auto mb-20 mt-44 h-auto lg:h-screen">
      <h1 className="mb-8 text-center text-3xl font-bold text-white lg:mb-10">
        {data.title}
      </h1>
      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <img
          className="mb-2 w-64 lg:w-96"
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt=""
        />
        <div className="px-10">
          <p className="mb-9  text-xl leading-8 text-white lg:w-2/4">
            {data.description}
          </p>

          <FavoritesComponent
            item={data}
            label="comic"
            userCookies={userCookies}
            handleAddFavorite={handleAddFavorite}
            handleRemoveFavorite={handleRemoveFavorite}
          />
        </div>
      </div>
    </main>
  );
};
export default Comic;
