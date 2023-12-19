import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import spinnerLogin from "../assets/images/spinner-login.gif";

const LoginForm = ({
  action,
  apiURL,
  createUserCookies,
  closeModal,
  error,
  setError,
  errorMessage,
  setErrorMessage,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setErrorMessage("");

    try {
      const response = await axios.post(`${baseUrl}/${apiURL}`, {
        email,
        password,
      });
      console.log("response==>", response.data);
      const token = response.data.token;
      const userId = response.data._id;
      const emailCookie = response.data.email;
      const usernameCookie = response.data.username;
      const avatar = response.data.avatar;

      createUserCookies(userId, emailCookie, usernameCookie, token, avatar);

      setEmail("");
      setPassword("");
      closeModal();
      if (location.pathname === "/signup") {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
      setError(true);

      if (error.response.data.message === "All fields are required!") {
        setErrorMessage("Please fill in all fields");
      } else if (error.response.status === 401) {
        setErrorMessage("Your credentials are not valid");
      }
    }
  };
  return (
    <div className="form-wrapper flex flex-col items-center py-10">
      <form
        className="flex w-full flex-col gap-4 py-8"
        action=""
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <h2 className="text-2xl uppercase text-white">
          {action === "signup" ? "Sign up" : "Log in"}
        </h2>
        {error && <p className="red">{errorMessage}</p>}

        <input
          onChange={(event) => {
            setEmail(event.target.value);
            setError(false);
            setErrorMessage("");
          }}
          type="email"
          id="email"
          placeholder="Email address"
          value={email}
          className="w-full"
        />

        <div className="relative">
          <input
            onChange={(event) => {
              setPassword(event.target.value);
              setError(false);
              setErrorMessage("");
            }}
            type={`${showPass ? "text" : "password"}`}
            id="password"
            placeholder="Password"
            value={password}
            className="w-full"
          />

          {showPass ? (
            <FontAwesomeIcon
              onClick={() => {
                setShowPass(false);
              }}
              className="absolute right-10 top-8 cursor-pointer text-xl text-white"
              icon="fa-regular fa-eye-slash"
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => {
                if (password) {
                  setShowPass(true);
                }
              }}
              className={`absolute right-10 top-8  text-xl ${
                password ? "cursor-pointer text-white" : "text-gray-500"
              } `}
              icon="fa-regular fa-eye"
            />
          )}
        </div>
        <button className="mt-2" type="submit">
          Log in
        </button>
      </form>
      <div className="boutons">
        <div
          className=" cursor-pointer font-bold text-white transition-all duration-500 ease-in-out hover:text-[#ed1d24]"
          onClick={() => {
            closeModal();
            navigate("/signup");
          }}
        >
          Not a member yet? Sign up for free
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
