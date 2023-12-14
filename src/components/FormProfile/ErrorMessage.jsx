const ErrorMessage = ({ error, errorMessage }) => {
  return (
    <div className="h-8">
      <p className="red">{error && errorMessage}</p>
    </div>
  );
};
export default ErrorMessage;
