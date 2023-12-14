import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const FavoritesComponent = ({
  item,
  label,
  userCookies,
  handleAddFavorite,
  handleRemoveFavorite,
  openModal,
}) => {
  return (
    <div className="favorites z-10">
      {item.isFavorite ? (
        <FontAwesomeIcon
          className="cursor-pointer text-2xl text-[#ed1d24]"
          onClick={() => {
            handleRemoveFavorite(item._id, label);
          }}
          icon="fa-solid fa-star"
        />
      ) : (
        <FontAwesomeIcon
          className="cursor-pointer text-2xl text-white"
          onClick={() => {
            if (userCookies) {
              handleAddFavorite(item._id, label);
            } else {
              openModal();
            }
          }}
          icon="fa-regular fa-star"
        />
      )}
    </div>
  );
};
export default FavoritesComponent;
