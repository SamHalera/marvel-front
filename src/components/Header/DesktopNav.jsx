import { Link } from "react-router-dom";

const DesktopNav = ({
  displayProfileSubmenu,
  setDisplayProfileSubmenu,
  handleRemoveUserCookies,
  userCookies,
  openModal,
}) => {
  return (
    <nav className="nav-desktop mr-5 hidden items-center gap-2 md:flex">
      <Link to="/">Home</Link>
      <Link to="/characters">Characters</Link>
      <Link to="/comics">Comics</Link>
      {!userCookies && (
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
