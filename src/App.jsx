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
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";

library.add(
  fas,
  faUser,
  faBars,
  faCircleXmark,
  faStar,
  faHeart,
  faPlus,
  faIdCardClip,
);
function App() {
  // const [token, setToken] = useState(Cookies.get("token") || null);
  // const [userId, setUserId] = useState(Cookies.get("userId") || null);
  // const [emailCookie, setEmailCookie] = useState(Cookies.get("email") || null);

  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const [displayCharacters, setDisplayCharacters] = useState("character");
  const [userCookies, setUserCookies] = useState(Cookies.get("user") || null);

  const user = userCookies && JSON.parse(Cookies.get("user"));

  const createUserCookies = (id, email, username, token) => {
    const user = {
      id,
      email,
      username,
      token,
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

  return (
    <>
      <Router>
        <Header
          userCookies={userCookies}
          handleRemoveUserCookies={handleRemoveUserCookies}
          createUserCookies={createUserCookies}
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
            path="/comics/:characterId"
            element={<Character userCookies={userCookies} user={user} />}
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
            element={<Profile user={user} userCookies={userCookies} />}
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
