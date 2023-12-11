import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Profile = ({ user, userCookies }) => {
  const navigate = useNavigate();
  return !userCookies ? (
    navigate("/login")
  ) : (
    <div className="main">
      <h1 className="text-white align-center">MY PROFILE</h1>

      <div className="wrapper-infos">
        <div className="user-infos text-white">
          <h2>{user.username}</h2>
          <h3>{user.email}</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
