import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
  const [count, setCount] = useState(0);
  const [favorite, setFavorite] = useState();
  const handleFavorite = (id, cookie) => {};

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Characters />}></Route>
          <Route path="/comics" element={<Comics />}></Route>
          <Route path="/comics/:characterId" element={<Character />}></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
