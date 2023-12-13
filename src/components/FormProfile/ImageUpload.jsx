import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ImageUpload = ({ picture, data, setPicture }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <div className=" flex items-center justify-center">
        {picture ? (
          <img
            className="test h-40 w-40 rounded-full  object-cover object-center"
            src={URL.createObjectURL(picture)}
          />
        ) : data.avatar ? (
          <img
            className="h-40 w-40 rounded-full object-cover object-center"
            src={data.avatar.secure_url}
          />
        ) : (
          <FontAwesomeIcon
            className="user-icon h-40 w-40 cursor-pointer rounded-full border border-solid border-white text-8xl text-white"
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
