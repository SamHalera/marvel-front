import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../api";

// import spinnerLogin from "../assets/images/spinner-login.gif";

const Form = ({ action, apiURL, createUserCookies }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setErrorMessage("");

    try {
      const response = await axios.post(`${baseUrl}/${apiURL}`, {
        username,
        email,
        password,
      });

      const token = response.data.token;
      const userId = response.data._id;
      const emailCookie = response.data.email;
      const usernameCookie = response.data.username;

      createUserCookies(userId, emailCookie, usernameCookie, token);

      setEmail("");
      setPassword("");
      setUsername("");
      navigate("/");
    } catch (error) {
      console.log(error.response.status);
      setError(true);

      if (error.response.data.message === "All fields are required!") {
        // Je met à jour mon state errorMessage
        setErrorMessage("Please fill in all fields");
      } else if (error.response.data.message === "This email already exists!") {
        setErrorMessage(
          "This email already has an account, please use another one :)"
        );
      } else if (error.response.status === 401) {
        setErrorMessage("Your credentials are not valid");
      }
    }
  };
  return (
    <div className="form-wrapper">
      <form
        action=""
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <h2>{action === "signup" ? "Sign up" : "Log in"}</h2>
        {error && <p className="red">{errorMessage}</p>}

        <input
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          type="text"
          id="username"
          placeholder="Username"
          value={username}
        />

        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          id="email"
          placeholder="Email address"
          value={email}
        />

        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          id="password"
          placeholder="Password"
          value={password}
        />
        <button type="submit">
          {action === "signup" ? "Sign up" : "Log in"}
        </button>
      </form>
      <div className="boutons">
        {action === "signup" ? (
          <Link to="/login">Already an account? Log in</Link>
        ) : (
          <Link to="/signup">Not a member yet? Sign up for free</Link>
        )}
      </div>
    </div>
  );
};

export default Form;
