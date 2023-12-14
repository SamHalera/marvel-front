const SearchBar = ({ setValue, setSkip, value, label }) => {
  return (
    <div className="search-bar m-auto flex w-2/3 flex-col items-center gap-5 py-8">
      <span className="mb-5 mt-5 text-3xl text-white">
        Find your favorite {label}
      </span>
      <div className="input-wrapper">
        <input
          className=" border border-solid border-red-500 bg-transparent  px-5  py-2 text-xl text-white"
          onChange={(event) => {
            setValue(event.target.value);

            setSkip(1);
          }}
          type="text"
          id="name"
          value={value}
        />
      </div>
    </div>
  );
};
export default SearchBar;
