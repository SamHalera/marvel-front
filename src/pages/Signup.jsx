//Components
import Form from "../components/Form";

const Signup = ({ handleToken, handleId }) => {
  return (
    <main className="form-container">
      <div className="container">
        <Form
          action="signup"
          apiURL="user/signup"
          handleToken={handleToken}
          handleId={handleId}
        />
      </div>
    </main>
  );
};
export default Signup;
