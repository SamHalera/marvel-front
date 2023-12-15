const ItemCarouselHome = ({ item }) => {
  return (
    <>
      <div className="relative mr-3 w-60 shrink-0">
        <img
          className="mb-2 h-72 object-cover object-center"
          src={`${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}`}
          alt=""
        />
        <h3 className="absolute bottom-8 h-14 w-full bg-[#ed1d24] bg-opacity-80 p-2 text-center font-bold text-white">
          {item.title || item.name}
        </h3>
      </div>
    </>
  );
};
export default ItemCarouselHome;
