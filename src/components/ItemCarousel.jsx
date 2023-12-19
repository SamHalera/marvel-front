import { Link } from "react-router-dom";
const ItemCarousel = ({ item, userCookies }) => {
  console.log("Item==>", item);
  return (
    <>
      <Link
        to={`/comic/${item._id}`}
        className=" blam w-60 shrink-0 hover:opacity-50"
      >
        <img
          className="mb-2"
          src={`${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}`}
          alt=""
        />
        <h3 className="text-center text-white">{item.title}</h3>
      </Link>
    </>
  );
};
export default ItemCarousel;
