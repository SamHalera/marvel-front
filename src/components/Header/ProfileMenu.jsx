import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProfileMenu = ({
  refProfile,
  displayProfileSubmenu,
  setDisplayProfileSubmenu,
  handleRemoveUserCookies,
}) => {
  const navigate = useNavigate();
  return (
    <div className="profile-menu relative flex h-12 w-12 items-center justify-center rounded-full border border-solid border-white">
      <FontAwesomeIcon
        ref={refProfile}
        onClick={() => {
          setDisplayProfileSubmenu(!displayProfileSubmenu);
        }}
        className="user-icon cursor-pointer text-3xl text-white"
        icon="fa-solid fa-user"
      />
      {displayProfileSubmenu && (
        <div className=" profile-submenu absolute -right-2 top-14 flex w-40 flex-col gap-8 bg-white px-5 py-8 ">
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
  );
};
export default ProfileMenu;
