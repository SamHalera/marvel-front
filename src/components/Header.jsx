import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/images/logo.svg";
import { useState } from "react";
const Header = ({ token, handleToken, setToken, setUserId }) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const navigate = useNavigate();

  // const handleDisplayMenu = ()=>()
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
        <div>
          <div className="burger-mobile">
            {!displayMenu && (
              <i
                onClick={() => {
                  setDisplayMenu(true);
                }}
                className="fas fa-bars"
              ></i>
            )}
            {displayMenu && (
              <i
                onClick={() => {
                  setDisplayMenu(false);
                }}
                className="far fa-times-circle"
              ></i>
            )}
          </div>
          {displayMenu && (
            <nav className="nav-mobile">
              <span
                onClick={() => {
                  setDisplayMenu(false);
                  navigate("/");
                }}
              >
                Characters
              </span>
              <span
                onClick={() => {
                  setDisplayMenu(false);
                  navigate("/comics");
                }}
              >
                Comics
              </span>
              <span
                onClick={() => {
                  setDisplayMenu(false);
                  navigate("/favorites");
                }}
              >
                My Favorites
              </span>
              <button
                onClick={() => {
                  Cookies.remove("token");
                  Cookies.remove("userId");
                  setToken(null);
                  setUserId(null);
                  setDisplayMenu(false);
                  // handleToken(null);
                  // handleId(null);
                  navigate("/login");
                }}
                className="btn-logout"
              >
                Logout
              </button>
            </nav>
          )}

          <nav className="nav-desktop">
            <Link to="/">Characters</Link>
            <Link to="/comics">Comics</Link>
            <Link to="/favorites">My Favorites</Link>
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
          </nav>
        </div>
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
