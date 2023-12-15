import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fas,
  faUser,
  faBars,
  faPlus,
  faIdCardClip,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faStar,
  faCircleXmark,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import baseUrl from "./api";
//assets
import "./App.css";

//Components
import Header from "./components/Header/Header";

//Pages
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Comic from "./pages/Comic";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Home from "./pages/Home";

library.add(
  fas,
  faUser,
  faBars,
  faCircleXmark,
  faStar,
  faHeart,
  faPlus,
  faIdCardClip,
  faEye,
  faEyeSlash,
);
function App() {
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const [displayCharacters, setDisplayCharacters] = useState("character");
  const [userCookies, setUserCookies] = useState(Cookies.get("user") || null);
  const [isOpen, setIsOpen] = useState(false);

  const user = userCookies && JSON.parse(Cookies.get("user"));

  const createUserCookies = (id, email, username, token, avatar) => {
    const user = {
      _id: id,
      email,
      username,
      token,
      avatar,
    };
    Cookies.set("user", JSON.stringify(user), { expires: 15 });
    setUserCookies(JSON.parse(Cookies.get("user")));
    console.log("create=>", JSON.parse(Cookies.get("user")));
  };

  const handleRemoveUserCookies = () => {
    Cookies.remove("user");
    setUserCookies(null);
    console.log("JE REMOVE");
  };

  const truncateStr = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };

  const handleAddFavorite = async (id, target) => {
    try {
      console.log("Hello favorite");
      const response = await axios.post(
        `${baseUrl}/favorites`,
        {
          itemId: id,
          label: target,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        },
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

  const openModal = () => {
    setIsOpen(true);
  };

  console.log("user===>", user);
  console.log("userCookies====>", userCookies);
  return (
    <>
      <Router>
        <Header
          handleRemoveUserCookies={handleRemoveUserCookies}
          createUserCookies={createUserCookies}
          user={user}
          userCookies={userCookies}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home truncateStr={truncateStr} userCookies={userCookies} />
            }
          ></Route>
          <Route
            path="/characters"
            element={
              <Characters
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                addedToFavorites={addedToFavorites}
                truncateStr={truncateStr}
                userCookies={userCookies}
                user={user}
                createUserCookies={createUserCookies}
              />
            }
          ></Route>
          <Route
            path="/comics"
            element={
              <Comics
                userCookies={userCookies}
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                addedToFavorites={addedToFavorites}
                truncateStr={truncateStr}
                user={user}
                createUserCookies={createUserCookies}
              />
            }
          ></Route>
          <Route
            path="/character/:characterId"
            element={
              <Character
                userCookies={userCookies}
                user={user}
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                addedToFavorites={addedToFavorites}
              />
            }
          ></Route>
          <Route
            path="/comic/:id"
            element={
              <Comic
                user={user}
                userCookies={userCookies}
                handleAddFavorite={handleAddFavorite}
                handleRemoveFavorite={handleRemoveFavorite}
                addedToFavorites={addedToFavorites}
              />
            }
          ></Route>
          {/* <Route path="/character/:id" element={<Character />}></Route> */}
          <Route
            path="/favorites"
            element={
              <Favorites
                truncateStr={truncateStr}
                baseUrl={baseUrl}
                displayCharacters={displayCharacters}
                setDisplayCharacters={setDisplayCharacters}
                addedToFavorites={addedToFavorites}
                handleRemoveFavorite={handleRemoveFavorite}
                userCookies={userCookies}
                user={user}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                userCookies={userCookies}
                setUserCookies={setUserCookies}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={<Signup createUserCookies={createUserCookies} />}
          ></Route>
          {/* <Route
            path="/login"
            element={<Login createUserCookies={createUserCookies} />}
          ></Route> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
