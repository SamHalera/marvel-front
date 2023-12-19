import spinner from "../assets/images/spinner.gif";
const Loader = () => {
  return (
    <div className="loader mx-12 my-24 flex h-screen items-center justify-center p-10 text-3xl text-white">
      <img src={spinner} alt="" className=" h-28 w-28" />
    </div>
  );
};
export default Loader;
