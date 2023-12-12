import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import Cookies from "js-cookie";
import logo from "../../assets/images/logo.svg";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ProfileMenu from "./ProfileMenu";
import ModalAuth from "../ModalAuth";
import ProfileMenuHeadless from "./ProfileMenuHeadless";
const Header = ({
  userCookies,
  handleRemoveUserCookies,
  createUserCookies,
  user,
}) => {
  const [displayProfileSubmenu, setDisplayProfileSubmenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const refProfile = useRef();
  console.log(user);
  const openModal = () => {
    setIsOpen(true);
  };
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
    <header className="fixed top-0 flex w-full items-center justify-between px-12 py-5">
      <ModalAuth
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        createUserCookies={createUserCookies}
      />
      <MobileNav
        handleRemoveUserCookies={handleRemoveUserCookies}
        setDisplayProfileSubmenu={setDisplayProfileSubmenu}
        userCookies={userCookies}
        openModal={openModal}
      />

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

      <div className="flex justify-between">
        <DesktopNav
          displayProfileSubmenu={displayProfileSubmenu}
          setDisplayProfileSubmenu={setDisplayProfileSubmenu}
          userCookies={userCookies}
          openModal={openModal}
        />

        {userCookies && (
          <ProfileMenuHeadless
            refProfile={refProfile}
            displayProfileSubmenu={displayProfileSubmenu}
            setDisplayProfileSubmenu={setDisplayProfileSubmenu}
            handleRemoveUserCookies={handleRemoveUserCookies}
            user={user}
            userCookies={userCookies}
          />
          // <ProfileMenu
          //   refProfile={refProfile}
          //   displayProfileSubmenu={displayProfileSubmenu}
          //   setDisplayProfileSubmenu={setDisplayProfileSubmenu}
          //   handleRemoveUserCookies={handleRemoveUserCookies}
          // />
        )}
      </div>
    </header>
  );
};
export default Header;
