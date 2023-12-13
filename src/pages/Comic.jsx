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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/comic/${id}?userId=${user.id}`,
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
    <main className="container mx-auto mt-44 h-screen">
      <h1 className="mb-10 text-center text-3xl font-bold text-white">
        {data.title}
      </h1>
      <div className="flex items-center gap-8">
        <img
          className="mb-2 w-96"
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt=""
        />
        <div>
          <p className="mb-9 w-2/4 text-xl leading-8 text-white">
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
