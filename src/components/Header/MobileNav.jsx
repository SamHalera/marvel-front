import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MobileNav = ({ setDisplayProfileSubmenu, userCookies, openModal }) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="md:hidden">
      <div className="burger-mobile">
        {!displayMenu && (
          <FontAwesomeIcon
            className="absolute left-8 top-8 text-3xl text-white"
            onClick={() => {
              setDisplayMenu(true);
              setDisplayProfileSubmenu(false);
            }}
            icon="fa-solid fa-bars"
          />
        )}
        {displayMenu && (
          <FontAwesomeIcon
            className="absolute left-8 top-8  z-40 text-3xl text-white"
            onClick={() => {
              setDisplayMenu(false);
            }}
            icon="fa-regular fa-circle-xmark"
          />
        )}
      </div>
      {displayMenu && (
        <nav className="nav-mobile fixed bottom-0 left-0 right-0 top-0 z-30 flex h-full w-full flex-col items-center justify-start gap-7 bg-black px-5 py-20 ">
          <span
            className="text-3xl font-bold"
            onClick={() => {
              setDisplayMenu(false);
              navigate("/");
            }}
          >
            Home
          </span>
          <span
            className="text-3xl font-bold"
            onClick={() => {
              setDisplayMenu(false);
              navigate("/characters");
            }}
          >
            Characters
          </span>
          <span
            className="text-3xl font-bold"
            onClick={() => {
              setDisplayMenu(false);
              navigate("/comics");
            }}
          >
            Comics
          </span>
          {userCookies && (
            <>
              <Link to={"/signup"}>Signup</Link>
              <a
                onClick={() => {
                  setDisplayMenu(false);
                  openModal();
                }}
              >
                Login
              </a>
            </>
          )}

          {/* <button
            onClick={() => {
              handleRemoveUserCookies();
              setDisplayMenu(false);

              navigate("/login");
            }}
            className="btn-logout"
          >
            Logout
          </button> */}
        </nav>
      )}
    </div>
  );
};
export default MobileNav;
