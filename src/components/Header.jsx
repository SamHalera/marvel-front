import { Link, Navigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
const Header = ({ token, handleToken }) => {
  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="" />
      </Link>

      {token ? (
        <nav>
          <button
            onClick={() => {
              handleToken(null);
              <Navigate to="/" />;
            }}
            className="btn-logout"
          >
            Logout
          </button>
          <Link to="/">Characters</Link>
          <Link to="/comics">Comics</Link>
          {token && <Link to="/favorites">My Favorites</Link>}
        </nav>
      ) : (
        <nav>
          {!token && <Link to={"/signup"}>Signup</Link>}
          {!token && <Link to={"/login"}>Login</Link>}
        </nav>
      )}
    </header>
  );
};
export default Header;
