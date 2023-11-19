import { useState } from "react";
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
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);
  const [emailCookie, setEmailCookie] = useState(Cookies.get("email") || null);

  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const [displayCharacters, setDisplayCharacters] = useState("character");

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });

      setToken(token);
    } else {
      Cookies.remove("token");

      setToken(null);
    }
  };
  const handleEmailCookie = (email) => {
    if (email) {
      Cookies.set("email", email, { expires: 15 });

      setEmailCookie(email);
    } else {
      Cookies.remove("email");

      setEmailCookie(null);
    }
  };

  const handleId = (userId) => {
    if (userId) {
      Cookies.set("userId", userId, { expires: 15 });

      setUserId(userId);
    } else {
      Cookies.remove("userId");

      setUserId(null);
    }
  };
  const truncateStr = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };

  const handleAddFavorite = async (id, target) => {
    try {
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
    } catch (error) {
      console.log(error.response, "<== message error");
    }
  };
  const handleRemoveFavorite = async (id, target) => {
    try {
      const response = await axios.delete(`${baseUrl}/favorites/${id}`);
      setAddedToFavorites(!addedToFavorites);
    } catch (error) {
      console.log(error.response, "<== message error");
    }
  };

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
                emailCookie={emailCookie}
              />
            }
          ></Route>
          <Route
            path="/comics"
            element={
              <Comics
                token={token}
                userId={userId}
                emailCookie={emailCookie}
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                addedToFavorites={addedToFavorites}
                truncateStr={truncateStr}
              />
            }
          ></Route>
          <Route
            path="/comics/:characterId"
            element={<Character token={token} emailCookie={emailCookie} />}
          ></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          <Route
            path="/favorites"
            element={
              <Favorites
                token={token}
                userId={userId}
                emailCookie={emailCookie}
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
            element={
              <Signup
                handleToken={handleToken}
                handleId={handleId}
                handleEmailCookie={handleEmailCookie}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Login
                handleToken={handleToken}
                handleId={handleId}
                handleEmailCookie={handleEmailCookie}
              />
            }
          ></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
