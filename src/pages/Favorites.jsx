import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const Favorites = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log("localStorage=> ", localStorage);
  const localStorageFavorites = JSON.parse(localStorage.getItem("favorites"));
  console.log("localStorageARRAY=> ", localStorageFavorites);
  useEffect(() => {
    const fetchData = async () => {
      console.log("INSIDE FETCHDATA");

      const characters = localStorageFavorites.characters;
      const comics = localStorageFavorites.comics;
      for (let i = 0; i < characters.length; i++) {
        console.log(characters[i]);

        try {
          const response = await axios.get(
            `http://localhost:3000/character/${characters[i]}`
          );

          console.log("data =>", response.data);
          setData(response.data);

          //when data are created we scroll smoothly to the div of list
          // document.body.scrollTop = 400; // For Safari
          // document.documentElement.scrollTop = 400; // For Chrome, Firefox, IE and Opera
        } catch (error) {
          console.log(error.response, "message error");
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);
  return isLoading ? (
    <div className="loader">LOADING</div>
  ) : (
    <main className="favorites-main">Favorites</main>
  );
};
export default Favorites;
