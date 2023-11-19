import Form from "../components/Form";

const Login = ({ handleToken, handleId, handleEmailCookie }) => {
  return (
    <main className="form-container">
      <div className="container">
        <Form
          action="login"
          apiURL="user/login"
          handleToken={handleToken}
          handleId={handleId}
          handleEmailCookie={handleEmailCookie}
        />
      </div>
    </main>
  );
};
export default Login;
