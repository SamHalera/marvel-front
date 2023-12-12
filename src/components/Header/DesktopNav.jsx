import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DesktopNav = ({
  displayProfileSubmenu,
  setDisplayProfileSubmenu,
  handleRemoveUserCookies,
  userCookies,
  openModal,
}) => {
  const navigate = useNavigate();
  return (
    <nav className="nav-desktop mr-5 hidden items-center gap-3 md:flex">
      <Link to="/">Characters</Link>
      <Link to="/comics">Comics</Link>

      {userCookies ? (
        <Link to="/favorites">My Favorites</Link>
      ) : (
        <>
          <Link to={"/signup"}>Signup</Link>
          <a className="cursor-pointer" onClick={openModal}>
            Login
          </a>
        </>
      )}
    </nav>
  );
};
export default DesktopNav;
