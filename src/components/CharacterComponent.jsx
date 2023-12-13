import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FavoritesComponent from "./FavoritesComponent";
const CharacterComponent = ({
  character,
  userCookies,
  handleAddFavorite,
  handleRemoveFavorite,
  openModal,
  truncateStr,
}) => {
  return (
    <article className="item character-item my-5 flex w-1/2 flex-col gap-4 md:w-1/4 lg:w-1/6">
      {userCookies ? (
        <Link className="image-wrapper" to={`/comics/${character._id}`}>
          <img
            className="  h-64 w-full object-cover object-center"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt=""
          />
        </Link>
      ) : (
        <div
          onClick={() => {
            openModal();
          }}
          className="image-wrapper cursor-pointer transition-all duration-500 ease-in-out hover:opacity-50"
        >
          <img
            className="  h-64 w-full object-cover object-center"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt=""
          />
        </div>
      )}

      <h2 className="text-2xl text-white">{character.name}</h2>
      <FavoritesComponent
        item={character}
        label="character"
        userCookies={userCookies}
        handleAddFavorite={handleAddFavorite}
        handleRemoveFavorite={handleRemoveFavorite}
        openModal={openModal}
      />

      <p className="text-white">
        {character.description && truncateStr(character.description, 100)}
      </p>
    </article>
  );
};
export default CharacterComponent;
