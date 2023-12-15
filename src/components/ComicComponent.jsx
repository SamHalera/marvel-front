import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FavoritesComponent from "./FavoritesComponent";
const ComicComponent = ({
  comic,
  userCookies,
  handleAddFavorite,
  handleRemoveFavorite,
  openModal,
  truncateStr,
}) => {
  return (
    <article className="item comics-item my-5 flex w-72 flex-col gap-4 md:w-48 lg:w-72">
      {userCookies ? (
        <Link to={`/comic/${comic._id}`} className="hover:opacity-50">
          <img
            className="w-full object-cover object-center lg:h-72 lg:w-72"
            src={`${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`}
            alt=""
          />
          <h2 className="text-2xl text-white">{comic.title}</h2>
          <p className="text-white">
            {comic.description && truncateStr(comic.description, 120)}
          </p>
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
            src={`${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`}
            alt=""
          />
          <h2 className="text-2xl text-white">{comic.title}</h2>
          <p className="text-white">
            {comic.description && truncateStr(comic.description, 120)}
          </p>
        </div>
      )}
      <FavoritesComponent
        item={comic}
        label="comic"
        userCookies={userCookies}
        handleAddFavorite={handleAddFavorite}
        handleRemoveFavorite={handleRemoveFavorite}
        openModal={openModal}
      />
    </article>
  );
};
export default ComicComponent;
