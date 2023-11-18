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
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const [addedToFavorites, setAddedToFavorites] = useState(false);

  localStorage.clear();
  console.log("first", token);

  const handleToken = (token) => {
    console.log("Je suis ici");

    if (token) {
      console.log(" token en arg");
      Cookies.set("token", token, { expires: 15 });

      setToken(token);
    } else {
      console.log("Je suis dans le else");
      localStorage.removeItem("token");
      console.log("REMOVE", token);
      setToken(null);
    }
  };
  const truncateStr = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };

  const handleAddFavorite = async (id, target) => {
    try {
      const response = await axios.post(`${baseUrl}/favorites/`, {
        itemId: id,
        label: target,
      });
      setAddedToFavorites(true);
      console.log(response.data);
    } catch (error) {
      console.log(error.response, "<== message error");
    }
  };
  const handleRemoveFavorite = async (id, target) => {
    try {
      const response = await axios.delete(`${baseUrl}/favorites/`, {
        itemId: id,
      });
      setAddedToFavorites(false);
      console.log(response.data);
    } catch (error) {
      console.log(error.response, "<== message error");
    }
  };
  console.log("second", token);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                addedToFavorites={addedToFavorites}
                truncateStr={truncateStr}
              />
            }
          ></Route>
          <Route
            path="/comics"
            element={
              <Comics
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                addedToFavorites={addedToFavorites}
                truncateStr={truncateStr}
              />
            }
          ></Route>
          <Route path="/comics/:characterId" element={<Character />}></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          <Route
            path="/favorites"
            element={<Favorites truncateStr={truncateStr} baseUrl={baseUrl} />}
          ></Route>
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          ></Route>
          <Route
            path="/login"
            element={<Login handleToken={handleToken} />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
