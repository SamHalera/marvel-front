import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const InputPass = ({
  setError,
  setErrorMessage,
  value,
  setValue,
  showValue,
  setShowValue,
  id,
  placeholder,
}) => {
  return (
    <div className="relative">
      <input
        className="w-full"
        onChange={(event) => {
          setError(false);
          setErrorMessage("");
          setValue(event.target.value);
        }}
        type={`${showValue ? "text" : "password"}`}
        id={id}
        placeholder={placeholder}
        value={value}
      />

      {showValue ? (
        <FontAwesomeIcon
          onClick={() => {
            setShowValue(false);
          }}
          className="absolute right-2 top-8 cursor-pointer text-xl text-white"
          icon="fa-regular fa-eye-slash"
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => {
            if (value) {
              setShowValue(true);
            }
          }}
          className={`absolute right-2 top-8  text-xl ${
            value ? "cursor-pointer text-white" : "text-gray-500"
          } `}
          icon="fa-regular fa-eye"
        />
      )}
    </div>
  );
};
export default InputPass;
