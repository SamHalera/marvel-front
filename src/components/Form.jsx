import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../api";
import Cookies from "js-cookie";

// import spinnerLogin from "../assets/images/spinner-login.gif";

const Form = ({ action, apiURL, handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);

    console.log("Form Submitted...");

    try {
      if (!email || !password) {
        setError(true);
      } else {
        console.log("hello");

        const response = await axios.post(`${baseUrl}/${apiURL}`, {
          email,
          password,
        });
        console.log("AXIOS SUCCES");
        console.log("user", response.data.token);
        const token = response.data.token;

        // Cookies.set("token", token, { expires: 15 });

        handleToken(token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      action=""
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <h1>{action === "signup" ? "S'inscrire" : "Se connecter"}</h1>

      {!email && error && <p className="danger">Ce champs est obligatoire</p>}
      <input
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        type="email"
        id="email"
        placeholder="Votre adresse email"
        value={email}
      />

      {!password && error && (
        <p className="danger">Ce champs est obligatoire</p>
      )}
      <input
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        type="password"
        id="password"
        placeholder="Votre mot de passe"
        value={password}
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Form;
