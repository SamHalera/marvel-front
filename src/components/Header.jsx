import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/images/logo.svg";
const Header = ({ token, handleToken, setToken, setUserId }) => {
  const navigate = useNavigate();

  return (
    <header>
      {/* <Link to="/" className="logo">
        <img src={logo} alt="" />
      </Link> */}

      <img
        onClick={() => {
          if (!token) {
            navigate("/login");
          } else {
            navigate("/login");
          }
        }}
        className="logo"
        src={logo}
        alt=""
      />

      {token ? (
        <nav>
          <button
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("userId");
              setToken(null);
              setUserId(null);
              // handleToken(null);
              // handleId(null);
              navigate("/login");
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
          <Link to={"/signup"}>Signup</Link>
          <Link to={"/login"}>Login</Link>
        </nav>
      )}
    </header>
  );
};
export default Header;
