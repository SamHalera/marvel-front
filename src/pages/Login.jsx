import Form from "../components/Form";

const Login = ({ userCookies, setUserCookies, createUserCookies }) => {
  console.log(userCookies);
  return (
    <main className="form-container bg-settings">
      <div className="overlay">
        <div className="container">
          <Form
            action="login"
            apiURL="user/login"
            createUserCookies={createUserCookies}
          />
          <div className="presentation">
            <h1>
              Welcome to the
              <span className="red"> Marvelous World of Marvel</span>
            </h1>
            <h2>Discover all the heroes and their Comics Sagas</h2>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Login;
