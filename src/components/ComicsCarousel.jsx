import { Link } from "react-router-dom";
import ItemCarousel from "./ItemCarousel";
const ComicsCarousel = ({ data }) => {
  return (
    <div className="list-of-comics flex w-4/5 flex-nowrap overflow-x-scroll">
      {data.comics.map((comic) => {
        return <ItemCarousel key={comic._id} item={comic} />;
      })}
    </div>
  );
};
export default ComicsCarousel;
