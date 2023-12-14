const ButtonForm = ({ username, picture, password, newPassword }) => {
  return (
    <>
      {username || picture || (password && newPassword) ? (
        <button className="mt-2 self-end" type="submit">
          Update
        </button>
      ) : (
        <span className=" mt-2 w-28 self-end bg-gray-400 p-2 text-center ">
          Update
        </span>
      )}
    </>
  );
};
export default ButtonForm;
