import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import baseUrl from "./api";
//assets
import "./App.css";

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
  const [userId, setUserId] = useState(Cookies.get("userId") || null);

  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const [displayCharacters, setDisplayCharacters] = useState("character");

  const handleToken = (token) => {
    console.log("Je suis ici");

    if (token) {
      console.log(" token en arg : ", token);
      Cookies.set("token", token, { expires: 15 });

      setToken(token);
    } else {
      console.log("Je suis dans le else");
      Cookies.remove("token");
      console.log("REMOVE", token);
      setToken(null);
    }
  };

  const handleId = (userId) => {
    console.log("dans le handleId");
    if (userId) {
      Cookies.set("userId", userId, { expires: 15 });

      setUserId(userId);
    } else {
      Cookies.remove("userId");
      console.log("REMOVE", userId);
      setUserId(null);
    }
  };
  const truncateStr = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };

  const handleAddFavorite = async (id, target) => {
    try {
      console.log("id=>", id);
      console.log("label=>", target);
      const response = await axios.post(
        `${baseUrl}/favorites`,
        {
          itemId: id,
          label: target,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAddedToFavorites(!addedToFavorites);
      console.log("response add favorite=>", response.data);
    } catch (error) {
      console.log(error.response, "<== message error");
    }
  };
  const handleRemoveFavorite = async (id, target) => {
    try {
      const response = await axios.delete(`${baseUrl}/favorites/${id}`);
      setAddedToFavorites(!addedToFavorites);
      console.log(response.data);
    } catch (error) {
      console.log(error.response, "<== message error");
    }
  };
  console.log("second", token);
  return (
    <>
      <Router>
        <Header
          token={token}
          handleToken={handleToken}
          handleId={handleId}
          setToken={setToken}
          setUserId={setUserId}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                addedToFavorites={addedToFavorites}
                truncateStr={truncateStr}
                token={token}
                handleToken={handleToken}
                userId={userId}
                handleId={handleId}
              />
            }
          ></Route>
          <Route
            path="/comics"
            element={
              <Comics
                token={token}
                userId={userId}
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                addedToFavorites={addedToFavorites}
                truncateStr={truncateStr}
              />
            }
          ></Route>
          <Route
            path="/comics/:characterId"
            element={<Character token={token} />}
          ></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          <Route
            path="/favorites"
            element={
              <Favorites
                token={token}
                userId={userId}
                truncateStr={truncateStr}
                baseUrl={baseUrl}
                displayCharacters={displayCharacters}
                setDisplayCharacters={setDisplayCharacters}
                addedToFavorites={addedToFavorites}
                handleRemoveFavorite={handleRemoveFavorite}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} handleId={handleId} />}
          ></Route>
          <Route
            path="/login"
            element={<Login handleToken={handleToken} handleId={handleId} />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
