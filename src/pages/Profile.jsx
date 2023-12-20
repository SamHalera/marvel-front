import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import baseUrl from "../api";
import axios from "axios";
import Loader from "../components/Loader";
import Form from "../components/FormProfile/Form";

const Profile = ({ user, userCookies, setUserCookies }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState();
  const [picture, setPicture] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userIsUpdated, setUserIsUpdated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setData(response.data);
        setIsLoading(false);

        console.log("user===>", response.data);
      } catch (error) {
        console.log(error, "<=====message error");
      }
    };
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    fetchData();
  }, [picture, userIsUpdated]);

  return !userCookies ? (
    navigate("/login")
  ) : isLoading ? (
    <Loader />
  ) : (
    <div className="main mb-11 mt-40 flex h-auto flex-col">
      <h1 className=" my-18 text-center text-4xl font-bold text-white">
        MY PROFILE
      </h1>

      <div className="wrapper-infos mx-auto mt-6 w-4/5">
        <div className="user-infos form-wrapper">
          <Form
            data={data}
            picture={picture}
            setPicture={setPicture}
            userIsUpdated={userIsUpdated}
            setUserIsUpdated={setUserIsUpdated}
            user={user}
            setUserCookies={setUserCookies}
            setIsLoading={setIsLoading}
            setData={setData}
            error={error}
            setError={setError}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
