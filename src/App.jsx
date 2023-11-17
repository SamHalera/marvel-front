import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

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
  const [favorites, setFavorites] = useState({});

  console.log("favorite=>", favorites);
  // const handleClickFavorite = (id, action) => {
  //   if (action === "add") {
  //     const cloneFavorites = [...favorites];

  //     cloneFavorites.push(id);
  //     setFavorites(cloneFavorites);
  //   } else {
  //     const cloneFavorites = [...favorites];
  //     const index = cloneFavorites.indexOf(id);
  //     console.log(index);
  //     cloneFavorites.splice(index, 1);
  //     setFavorites(cloneFavorites);
  //   }
  // };
  const handleClickFavorite = async (id, action, target) => {
    const userId = "65569f6bcac6d8bf122062c8";
    if (target === "character") {
      if (action === "add") {
        try {
          const response = await axios.put(
            `http://localhost:3000/favorites/${userId}?addCharacter=${id}`
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
            `http://localhost:3000/favorites/${userId}?removeCharacter=${id}`
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
            `http://localhost:3000/favorites/${userId}?addComic=${id}`
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
            `http://localhost:3000/favorites/${userId}?removeComic=${id}`
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
                favorites={favorites}
              />
            }
          ></Route>
          <Route
            path="/comics"
            element={
              <Comics
                handleClickFavorite={handleClickFavorite}
                favorites={favorites}
              />
            }
          ></Route>
          <Route path="/comics/:characterId" element={<Character />}></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
