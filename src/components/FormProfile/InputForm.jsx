const InputForm = ({
  setError,
  setErrorMessage,
  value,
  setValue,
  data,
  type,
  id,
  placeholder,
}) => {
  return (
    <input
      onChange={(event) => {
        setError(false);
        setErrorMessage("");
        setValue(event.target.value);
      }}
      type={type}
      id={id}
      placeholder={placeholder}
      value={value ? value : data.username}
    />
  );
};
export default InputForm;
