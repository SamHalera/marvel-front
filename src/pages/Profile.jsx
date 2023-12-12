import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import baseUrl from "../api";
import axios from "axios";
import Loader from "../components/Loader";

const Profile = ({ user, userCookies }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  // const [currentAvatar, setCurrentAvatar] = useState(user.avatar);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("passsword", password);
      formData.append("newPassword", newPassword);
      formData.append("picture", picture);

      const response = await axios.put(`${baseUrl}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setIsLoading(false);
      console.log("response ===>", response.data);
    } catch (error) {
      console.log(error, "<=====message error");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setData(response.data);
        setIsLoading(false);

        console.log(response.data);
      } catch (error) {
        console.log(error, "<=====message error");
      }
    };
    fetchData();
  }, []);

  return !userCookies ? (
    navigate("/login")
  ) : isLoading ? (
    <Loader />
  ) : (
    <div className="main mt-40 flex h-screen flex-col">
      <h1 className=" my-18 text-center text-4xl font-bold text-white">
        MY PROFILE
      </h1>

      <div className="wrapper-infos mx-auto mt-6 w-4/5">
        <div className="user-infos form-wrapper">
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            action=""
            className="mx-auto flex w-1/3 flex-col gap-5"
          >
            <div className="flex flex-col items-center justify-center gap-7">
              <div className=" flex h-40 w-40 items-center justify-center rounded-full border border-solid border-white">
                {picture ? (
                  <img
                    className="h-40 w-40 rounded-full object-cover object-center"
                    src={URL.createObjectURL(picture)}
                  />
                ) : data.avatar ? (
                  <img
                    className="h-40 w-40 rounded-full object-cover object-center"
                    src={data.avatar.secure_url}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="user-icon cursor-pointer text-8xl text-white"
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

            <input
              onChange={(event) => {
                setError(false);
                setUsername(event.target.value);
              }}
              type="text"
              id="username"
              placeholder="Username"
              value={username ? username : data.username}
            />

            <input
              onChange={(event) => {
                setError(false);
                setPassword(event.target.value);
              }}
              type="password"
              id="password"
              placeholder="Password"
              value={password}
            />
            <input
              onChange={(event) => {
                setError(false);
                setNewPassword(event.target.value);
              }}
              type="password"
              id="newPassword"
              placeholder="New password"
              value={newPassword}
            />
            {username || picture || (password && newPassword) ? (
              <button className="mt-2 self-end" type="submit">
                Update
              </button>
            ) : (
              <span className=" mt-2 w-28 self-end bg-gray-400 p-2 text-center ">
                Update
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
