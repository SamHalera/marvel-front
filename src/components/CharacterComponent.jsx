import { Link } from "react-router-dom";

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
    <article className="item character-item my-5 flex w-72 flex-col gap-4 md:w-48 lg:w-72">
      {userCookies ? (
        <Link className="" to={`/character/${character._id}`}>
          <img
            className="w-full object-cover object-center lg:h-72 lg:w-72"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt=""
          />
        </Link>
      ) : (
        <div
          onClick={() => {
            openModal();
          }}
          className="cursor-pointer transition-all duration-500 ease-in-out hover:opacity-50"
        >
          <img
            className="w-full object-cover object-center lg:h-72 lg:w-72"
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

      <p className=" text-white">
        {character.description && truncateStr(character.description, 100)}
      </p>
    </article>
  );
};
export default CharacterComponent;
