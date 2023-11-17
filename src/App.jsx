import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import baseUrl from "./api";
//assets
import "./App.css";
import spinner from "./assets/images/spinner.gif";
//Components
import Header from "./components/Header";

//Pages
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";

function App() {
  const [storageHeroFavorites, setStorageHeroFavorites] = useState(
    localStorage.getItem("characterFavorites") || null
  );
  const [storageComicFavorites, setStorageComicFavorites] = useState(
    localStorage.getItem("comicFavorites") || null
  );
  const [favorites, setFavorites] = useState({});
  const [characterFavorites, setCharacterFavorites] = useState([]);

  localStorage.clear();

  const truncateStr = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };
  const handleUserFavorites = (id, action, target) => {
    //Si je vise un Character
    if (target === "character") {
      if (action === "add") {
        //Si le localStorage existe déjà j'ajoute l'id suivant
        if (localStorage.characterFavorites) {
          localStorage.setItem(
            "characterFavorites",

            `${localStorage.getItem("characterFavorites")},${id}`
          );
          setStorageHeroFavorites(localStorage.getItem("characterFavorites"));

          console.log(
            "ecco second",
            localStorage.getItem("characterFavorites")
          );
        } else {
          //si localStorage n'existe pas je le crée et j'ajoute l'id
          setStorageHeroFavorites(
            localStorage.setItem("characterFavorites", id)
          );
          console.log("ecco first", localStorage.getItem("characterFavorites"));
        }
      } else {
        const arrFromStorage = localStorage.characterFavorites.split(",");
        console.log(arrFromStorage);
        const index = arrFromStorage.indexOf(id);
        console.log(arrFromStorage.indexOf(id));
        arrFromStorage.splice(index, 1);
        console.log(arrFromStorage.join(","));
        setStorageHeroFavorites(
          localStorage.setItem("characterFavorites", arrFromStorage.join(","))
        );
      }
      //Si je vise un Comic
    } else {
      //J'ajoute un favoris
      if (action === "add") {
        //Si le localStorage existe déjà j'ajoute l'id suivant
        if (localStorage.comicsFavorites) {
          localStorage.setItem(
            "comicsFavorites",
            `${localStorage.getItem("comicsFavorites")},${id}`
          );
          setStorageComicFavorites(localStorage.getItem("comicsFavorites"));

          console.log("ecco second", localStorage.getItem("comicsFavorites"));

          //Si LocalStorage n'est pas là je le crée et j'ajoute l'id
        } else {
          setStorageComicFavorites(localStorage.setItem("comicsFavorites", id));
          console.log("ecco first", localStorage.getItem("comicsFavorites"));
        }
        //Je remove un Comics des favoris
      } else {
        const arrFromStorage = localStorage.comicsFavorites.split(",");
        console.log(arrFromStorage);
        const index = arrFromStorage.indexOf(id);
        console.log(arrFromStorage.indexOf(id));
        arrFromStorage.splice(index, 1);
        console.log(arrFromStorage.join(","));
        setStorageComicFavorites(
          localStorage.setItem("comicsFavorites", arrFromStorage.join(","))
        );
      }
    }
  };

  const handleClickFavorite = async (id, action, target) => {
    //hard coded for test
    const userId = "65569f6bcac6d8bf122062c8";

    if (target === "character") {
      if (action === "add") {
        try {
          const response = await axios.put(
            `${baseUrl}/favorites/${userId}?addCharacter=${id}`
          );

          console.log(response.data);

          localStorage.setItem("favorites", JSON.stringify(response.data));
          setFavorites(JSON.parse(localStorage.getItem("favorites")));
        } catch (error) {
          console.log(error.response, "<== message error");
        }
      } else {
        try {
          const response = await axios.put(
            `${baseUrl}/favorites/${userId}?removeCharacter=${id}`
          );

          console.log(response.data);

          localStorage.setItem("favorites", JSON.stringify(response.data));
          setFavorites(JSON.parse(localStorage.getItem("favorites")));
        } catch (error) {
          console.log(error.response, "<== message error");
        }
      }
    } else {
      if (action === "add") {
        try {
          const response = await axios.put(
            `${baseUrl}/favorites/${userId}?addComic=${id}`
          );

          console.log(response.data);

          localStorage.setItem("favorites", JSON.stringify(response.data));
          setFavorites(JSON.parse(localStorage.getItem("favorites")));
        } catch (error) {
          console.log(error.response, "<== message error");
        }
      } else {
        try {
          const response = await axios.put(
            `${baseUrl}/favorites/${userId}?removeComic=${id}`
          );

          console.log(response.data);

          localStorage.setItem("favorites", JSON.stringify(response.data));
          setFavorites(JSON.parse(localStorage.getItem("favorites")));
        } catch (error) {
          console.log(error.response, "<== message error");
        }
      }
    }
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                handleClickFavorite={handleClickFavorite}
                handleUserFavorites={handleUserFavorites}
                favorites={favorites}
                characterFavorites={characterFavorites}
                storageHeroFavorites={storageHeroFavorites}
                setStorageHeroFavorites={setStorageHeroFavorites}
                truncateStr={truncateStr}
              />
            }
          ></Route>
          <Route
            path="/comics"
            element={
              <Comics
                handleClickFavorite={handleClickFavorite}
                handleUserFavorites={handleUserFavorites}
                favorites={favorites}
                setStorageComicFavorites={setStorageComicFavorites}
                storageComicFavorites={storageComicFavorites}
                truncateStr={truncateStr}
              />
            }
          ></Route>
          <Route path="/comics/:characterId" element={<Character />}></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          <Route
            path="/favorites"
            element={<Favorites truncateStr={truncateStr} />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
