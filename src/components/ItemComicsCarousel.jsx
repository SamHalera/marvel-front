import { Link } from "react-router-dom";
const ItemComicsCarousel = ({ comic }) => {
  return (
    <Link
      to={`/comic/${comic._id}`}
      className=" w-60 shrink-0 hover:opacity-50"
    >
      <img
        className="mb-2"
        src={`${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`}
        alt=""
      />
      <h3 className="text-center text-white">{comic.title}</h3>
    </Link>
  );
};
export default ItemComicsCarousel;
