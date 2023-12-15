import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../api";

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
  // const [username, setUsername] = useState("");
  // const [error, setError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setErrorMessage("");

    try {
      const response = await axios.post(`${baseUrl}/${apiURL}`, {
        // username,
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
      // setUsername("");
      closeModal();
      if (location.pathname === "/signup") {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
      setError(true);

      if (error.response.data.message === "All fields are required!") {
        // Je met à jour mon state errorMessage
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

        {/* <input
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          type="text"
          id="username"
          placeholder="Username"
          value={username}
        /> */}

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

        <input
          onChange={(event) => {
            setPassword(event.target.value);
            setError(false);
            setErrorMessage("");
          }}
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          className="w-full"
        />
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
