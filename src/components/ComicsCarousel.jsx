import { Link } from "react-router-dom";
import ItemComicsCarousel from "./ItemComicsCarousel";
const ComicsCarousel = ({ data }) => {
  return (
    <div className="list-of-comics flex w-4/5 flex-nowrap overflow-x-scroll">
      {data.comics.map((comic) => {
        return <ItemComicsCarousel key={comic._id} comic={comic} />;
      })}
    </div>
  );
};
export default ComicsCarousel;
