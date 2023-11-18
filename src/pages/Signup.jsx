//Component No longer used. Use Modal instead

//Components
import Form from "../components/Form";

const Signup = ({ handleToken }) => {
  return (
    <main className="form-container">
      <div className="container">
        <Form action="signup" apiURL="user/signup" handleToken={handleToken} />
      </div>
    </main>
  );
};
export default Signup;
