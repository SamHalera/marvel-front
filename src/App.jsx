import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
//Components
import Header from "./components/Header";

//Pages
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Characters />}></Route>
          <Route path="/comics" element={<Comics />}></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
