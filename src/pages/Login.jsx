import Form from "../components/Form";

const Login = ({ handleToken, handleId }) => {
  return (
    <main className="form-container">
      <div className="container">
        <Form
          action="login"
          apiURL="user/login"
          handleToken={handleToken}
          handleId={handleId}
        />
      </div>
    </main>
  );
};
export default Login;
