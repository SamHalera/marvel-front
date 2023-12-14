import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../api";
import ImageUpload from "./ImageUpload";
import Title from "./Title";
import ErrorMessage from "./ErrorMessage";
import InputForm from "./InputForm";
import InputPass from "./InputPass";
import ButtonForm from "./ButtonForm";
const Form = ({
  data,
  userIsUpdated,
  setUserIsUpdated,
  user,
  setUserCookies,
  setIsLoading,
  setData,
  error,
  setError,
  errorMessage,
  setErrorMessage,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [picture, setPicture] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setErrorMessage("");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("newPassword", newPassword);
      formData.append("picture", picture);

      const response = await axios.put(`${baseUrl}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setData(response.data);
      setUserIsUpdated(!userIsUpdated);
      setIsLoading(false);

      Cookies.set("user", JSON.stringify(response.data), { expires: 15 });
      setUserCookies(JSON.parse(Cookies.get("user")));

      console.log("response ===>", response.data);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      setErrorMessage(error.response.data.message);
      console.log(error.response.data.message, "<=====message error");
    }
  };

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
      action=""
      className="mx-auto flex w-1/3 flex-col gap-5"
    >
      <ImageUpload picture={picture} data={data} setPicture={setPicture} />
      <Title data={data} />

      <ErrorMessage error={error} errorMessage={errorMessage} />

      <InputForm
        setError={setError}
        setErrorMessage={setErrorMessage}
        data={data}
        value={username}
        setValue={setUsername}
        id="username"
        type="text"
        placeholder="Username"
      />
      {/* <input
        onChange={(event) => {
          setError(false);
          setErrorMessage("");
          setUsername(event.target.value);
        }}
        type="text"
        id="username"
        placeholder="Username"
        value={username ? username : data.username}
      /> */}

      <InputPass
        setError={setError}
        setErrorMessage={setErrorMessage}
        value={password}
        setValue={setPassword}
        showValue={showPass}
        setShowValue={setShowPass}
        id="password"
        placeholder="Password"
      />

      <InputPass
        setError={setError}
        setErrorMessage={setErrorMessage}
        value={newPassword}
        setValue={setNewPassword}
        showValue={showNewPass}
        setShowValue={setShowNewPass}
        id="newPassword"
        placeholder="New Password"
      />

      <ButtonForm
        username={username}
        picture={picture}
        password={password}
        newPassword={newPassword}
      />
    </form>
  );
};
export default Form;
