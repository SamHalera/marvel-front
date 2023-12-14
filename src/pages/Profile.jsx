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
    fetchData();
  }, [userIsUpdated]);

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
          {/* <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            action=""
            className="mx-auto flex w-1/3 flex-col gap-5"
          >
            <div className="flex flex-col items-center justify-center gap-7">
              <div className=" flex items-center justify-center">
                {picture ? (
                  <img
                    className="test h-40 w-40 rounded-full  object-cover object-center"
                    src={URL.createObjectURL(picture)}
                  />
                ) : data.avatar ? (
                  <img
                    className="h-40 w-40 rounded-full object-cover object-center"
                    src={data.avatar.secure_url}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="user-icon h-40 w-40 cursor-pointer rounded-full border border-solid border-white text-8xl text-white"
                    icon="fa-solid fa-user"
                  />
                )}
              </div>
              <div>
                <label
                  className="red flex w-32 cursor-pointer items-center gap-2 border border-solid border-[#ed1d24] px-6 py-2 font-bold"
                  htmlFor="picture"
                >
                  <FontAwesomeIcon
                    className="user-icon red cursor-pointer text-xl text-white"
                    icon="fa-solid fa-plus"
                  />
                  upload
                </label>
                <input
                  onChange={(event) => {
                    setPicture(event.target.files[0]);
                  }}
                  className="hidden"
                  type="file"
                  name="picture"
                  id="picture"
                />
              </div>
            </div>
            <h2 className="red my-6 text-center text-3xl font-bold text-white">
              <FontAwesomeIcon
                className="mr-4 text-3xl"
                icon="fa-solid fa-id-card-clip"
              />{" "}
              {data.email}
            </h2>

            <div className=" h-8">
              <p className="red">{errorMessage && errorMessage}</p>
            </div>

            <input
              onChange={(event) => {
                setError(false);
                setErrorMessage("");
                setUsername(event.target.value);
              }}
              type="text"
              id="username"
              placeholder="Username"
              value={username ? username : data.username}
            />

            <div className="relative">
              <input
                className="w-full"
                onChange={(event) => {
                  setError(false);
                  setErrorMessage("");
                  setPassword(event.target.value);
                }}
                type={`${showPass ? "text" : "password"}`}
                id="password"
                placeholder="Password"
                value={password}
              />

              {showPass ? (
                <FontAwesomeIcon
                  onClick={() => {
                    setShowPass(false);
                  }}
                  className="absolute right-2 top-8 cursor-pointer text-xl text-white"
                  icon="fa-regular fa-eye-slash"
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => {
                    if (password) {
                      setShowPass(true);
                    }
                  }}
                  className={`absolute right-2 top-8  text-xl ${
                    password ? "cursor-pointer text-white" : "text-gray-500"
                  } `}
                  icon="fa-regular fa-eye"
                />
              )}
            </div>
            <div className="relative">
              <input
                className="w-full"
                onChange={(event) => {
                  setError(false);
                  setNewPassword(event.target.value);
                }}
                type={`${showNewPass ? "text" : "password"}`}
                id="newPassword"
                placeholder="New password"
                value={newPassword}
              />
              {showNewPass ? (
                <FontAwesomeIcon
                  onClick={() => {
                    setShowNewPass(false);
                  }}
                  className="absolute right-2 top-8 cursor-pointer text-xl text-white"
                  icon="fa-regular fa-eye-slash"
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => {
                    if (newPassword) {
                      setShowNewPass(true);
                    }
                  }}
                  className={`absolute right-2 top-8  text-xl ${
                    newPassword ? "cursor-pointer text-white" : "text-gray-500"
                  } `}
                  icon="fa-regular fa-eye"
                />
              )}
            </div>
            {username || picture || (password && newPassword) ? (
              <button className="mt-2 self-end" type="submit">
                Update
              </button>
            ) : (
              <span className=" mt-2 w-28 self-end bg-gray-400 p-2 text-center ">
                Update
              </span>
            )}
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
