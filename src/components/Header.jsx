import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
const Header = () => {
  return (
    <header>
      <img src={logo} alt="" />
      <nav>
        <Link to="/">Characters</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
};
export default Header;
