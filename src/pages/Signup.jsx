//Components
import Form from "../components/Form";

const Signup = ({ createUserCookies }) => {
  return (
    <main className="form-container bg-settings mb-2 h-screen py-10">
      <div className="overlay flex h-screen w-full justify-center pt-16 lg:h-screen">
        <div className="container flex flex-col-reverse justify-center gap-8 p-6 lg:flex-row">
          <Form
            action="signup"
            apiURL="user/signup"
            createUserCookies={createUserCookies}
          />
          <div className="presentation flex-2 w-3/3 flex flex-col justify-center gap-8 md:m-auto md:w-2/3">
            <h1 className=" text-2xl font-bold uppercase text-white lg:text-3xl">
              Enter the
              <span className="red"> Marvelous World of Marvel</span>
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Signup;
