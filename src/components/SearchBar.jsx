const SearchBar = ({ setValue, setSkip, value, label }) => {
  return (
    <div className="search-bar mx-auto flex w-full flex-col items-center gap-5 px-2 py-8">
      {/* <span className="mb-5 mt-5 text-3xl text-white">
        Find your favorite {label}
      </span> */}
      <div className="input-wrapper w-full lg:w-2/4">
        <input
          className=" w-full border border-solid border-red-500  bg-transparent  px-5 py-2 text-xl text-white"
          onChange={(event) => {
            setValue(event.target.value);

            setSkip(1);
          }}
          type="text"
          id="name"
          placeholder={`${
            label === "heroe"
              ? "Write your heroe's name"
              : "Write a comic's title"
          }`}
          value={value}
        />
      </div>
    </div>
  );
};
export default SearchBar;
