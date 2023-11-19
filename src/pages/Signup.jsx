//Components
import Form from "../components/Form";

const Signup = ({ handleToken, handleId, handleEmailCookie }) => {
  return (
    <main className="form-container">
      <div className="container">
        <Form
          action="signup"
          apiURL="user/signup"
          handleToken={handleToken}
          handleId={handleId}
          handleEmailCookie={handleEmailCookie}
        />
      </div>
    </main>
  );
};
export default Signup;
