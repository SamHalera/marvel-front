//Components
import Form from "../components/Form";

const Signup = ({ createUserCookies }) => {
  return (
    <main className="form-container bg-settings h-screen">
      <div className="overlay flex h-screen w-full justify-center pt-16">
        <div className="container flex justify-center gap-8">
          <Form
            action="signup"
            apiURL="user/signup"
            createUserCookies={createUserCookies}
          />
          <div className="presentation flex-2 flex flex-col justify-center gap-8">
            <h1 className="text-3xl font-bold uppercase text-white">
              Welcome to the
              <span className="red"> Marvelous World of Marvel</span>
            </h1>
            <h2 className="text-2xl text-white">
              Discover all the heroes and their Comics Sagas
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Signup;
