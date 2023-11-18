import Form from "../components/Form";

const Login = ({ handleToken }) => {
  return (
    <main className="form-container">
      <div className="container">
        <Form action="login" apiURL="user/login" handleToken={handleToken} />
      </div>
    </main>
  );
};
export default Login;
