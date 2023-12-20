import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ImageUpload = ({ picture, data, setPicture }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <div className="relative flex items-center justify-center">
        {picture ? (
          <>
            <img
              className="test h-28 w-28 rounded-full object-cover object-center  md:h-40 md:w-40"
              src={URL.createObjectURL(picture)}
            />
            <FontAwesomeIcon
              onClick={() => {
                setPicture();
              }}
              className="user-icon red absolute -right-2 top-1 cursor-pointer text-2xl text-white"
              icon="fa-solid fa-circle-xmark"
            />
          </>
        ) : data.avatar ? (
          <img
            className=" h-28 w-28 rounded-full object-cover object-center md:h-40 md:w-40"
            src={data.avatar.secure_url}
          />
        ) : (
          <FontAwesomeIcon
            className="user-icon  h-28 w-28 cursor-pointer rounded-full border border-solid border-white text-3xl text-white md:h-40 md:w-40 md:text-8xl"
            icon="fa-solid fa-user"
          />
        )}
      </div>
      <div>
        <label
          className="red flex w-32 cursor-pointer items-center gap-2 border border-solid border-[#ed1d24] px-6 py-2 font-bold"
          htmlFor="picture"
        >
          <FontAwesomeIcon
            className="user-icon red cursor-pointer text-xl text-white"
            icon="fa-solid fa-plus"
          />
          upload
        </label>
        <input
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
          className="hidden"
          type="file"
          name="picture"
          id="picture"
        />
      </div>
    </div>
  );
};
export default ImageUpload;
