import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="" />
      </Link>
      <nav>
        <Link to="/">Characters</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
};
export default Header;
