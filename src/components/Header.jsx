import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Cookies from "js-cookie";
import logo from "../assets/images/logo.svg";
import { useState } from "react";
const Header = ({ userCookies, handleRemoveUserCookies }) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayProfileSubmenu, setDisplayProfileSubmenu] = useState(false);
  const navigate = useNavigate();

  // const handleDisplayMenu = ()=>()
  return (
    <header>
      {/* <Link to="/" className="logo">
        <img src={logo} alt="" />
      </Link> */}

      <img
        onClick={() => {
          if (!userCookies) {
            navigate("/login");
          } else {
            navigate("/");
          }
        }}
        className="logo w-36"
        src={logo}
        alt=""
      />

      {userCookies ? (
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
                  handleRemoveUserCookies();
                  setDisplayMenu(false);

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
            <div className="profile-menu">
              <FontAwesomeIcon
                onClick={() => {
                  setDisplayProfileSubmenu(!displayProfileSubmenu);
                }}
                className="user-icon"
                icon="fa-solid fa-user"
              />
              {displayProfileSubmenu && (
                <div className="profile-submenu">
                  <Link
                    onClick={() => {
                      setDisplayProfileSubmenu(false);
                    }}
                    to="/profile"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleRemoveUserCookies();
                      setDisplayProfileSubmenu(false);
                      navigate("/login");
                    }}
                    className="btn-logout"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
