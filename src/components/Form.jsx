import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../api";

// import spinnerLogin from "../assets/images/spinner-login.gif";

const Form = ({ action, apiURL, handleToken, handleId, handleEmailCookie }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);

    console.log("Form Submitted...");

    try {
      if (!username || !email || !password) {
        setError(true);
      } else {
        console.log("hello");

        const response = await axios.post(`${baseUrl}/${apiURL}`, {
          username,
          email,
          password,
        });
        console.log("AXIOS SUCCES");
        console.log("user", response.data.token);
        const token = response.data.token;
        const userId = response.data._id;
        const emailCookie = response.data.email;

        handleToken(token);
        handleId(userId);
        handleEmailCookie(emailCookie);
        setEmail("");
        setPassword("");
        setUsername("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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

        {!username && error && <p className="danger">This field is required</p>}
        <input
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          type="text"
          id="username"
          placeholder="Username"
          value={username}
        />
        {!email && error && <p className="danger">This field is required</p>}
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          id="email"
          placeholder="Email address"
          value={email}
        />

        {!password && error && <p className="danger">This field is required</p>}
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
