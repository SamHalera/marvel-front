import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Title = ({ data }) => {
  return (
    <h2 className="red my-6 text-center text-2xl font-bold text-white">
      <FontAwesomeIcon
        className="mr-4 text-3xl"
        icon="fa-solid fa-id-card-clip"
      />
      {data.email}
    </h2>
  );
};
export default Title;
