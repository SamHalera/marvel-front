import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Cookies from "js-cookie";
import logo from "../../assets/images/logo.svg";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ProfileMenu from "./ProfileMenu";
const Header = ({ userCookies, handleRemoveUserCookies }) => {
  const [displayProfileSubmenu, setDisplayProfileSubmenu] = useState(false);
  const navigate = useNavigate();

  const refProfile = useRef();
  const handleClickWindow = (event) => {
    if (refProfile.current && !refProfile.current.contains(event.target)) {
      setDisplayProfileSubmenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickWindow);

    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, []);
  return (
    <header className="flex w-full items-center justify-between px-12 py-5">
      {userCookies && (
        <MobileNav
          handleRemoveUserCookies={handleRemoveUserCookies}
          setDisplayProfileSubmenu={setDisplayProfileSubmenu}
        />
      )}

      <img
        onClick={() => {
          if (!userCookies) {
            navigate("/login");
          } else {
            navigate("/");
          }
        }}
        className="logo w-24 md:w-36"
        src={logo}
        alt=""
      />

      {userCookies ? (
        <div className="flex justify-between">
          <DesktopNav
            displayProfileSubmenu={displayProfileSubmenu}
            setDisplayProfileSubmenu={setDisplayProfileSubmenu}
          />
          <ProfileMenu
            refProfile={refProfile}
            displayProfileSubmenu={displayProfileSubmenu}
            setDisplayProfileSubmenu={setDisplayProfileSubmenu}
            handleRemoveUserCookies={handleRemoveUserCookies}
          />
        </div>
      ) : (
        <nav
          className="flex items-center
         text-white"
        >
          <Link to={"/signup"}>Signup</Link>
          <Link to={"/login"}>Login</Link>
        </nav>
      )}
    </header>
  );
};
export default Header;
