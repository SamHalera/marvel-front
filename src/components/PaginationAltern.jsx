import axios from "axios";

const PaginationAltern = ({
  setData,
  setIsLoading,
  page,
  setPage,
  setSkip,
  nbPages,
  apiUrl,
  token,
}) => {
  console.log("token", token);
  const handlePagination = async (value, event) => {
    event.preventDefault();
    setIsLoading(true);
    if (value <= 1) {
      value = 1;
    } else if (value >= nbPages) {
      value = nbPages;
    }
    try {
      //verifier en local si cette requete declenche une erreur.==> possible car il n'y plus de headers qui est attendu en back
      const response = await axios.get(`${apiUrl}?skip=${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response.data===>", response.data);
      setData(response.data);
      setPage(value);
      setSkip(value);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response, "message error");
    }
  };

  return (
    <div className="pagination-wrapper">
      <div className="pagination m-8 flex flex-wrap items-center justify-center gap-3">
        {page <= 1 ? (
          <span className="disabled font-bold">prev</span>
        ) : (
          <span
            className="prev cursor-pointer font-bold text-white"
            onClick={(event) => {
              handlePagination(page - 1, event);
            }}
          >
            prev
          </span>
        )}

        {/* //which value for input ?? */}
        <form
          onSubmit={(event) => {
            handlePagination(page, event);
          }}
        >
          <input
            className=" mr-3 w-16 border border-solid border-[#ed1d24] bg-transparent p-2 text-white"
            onChange={(event) => {
              let value = event.target.value;
              if (event.target.value <= 0) {
                value = 1;
              } else if (event.target.value > nbPages) {
                value = nbPages;
              }
              setPage(event.target.value);
            }}
            type="number"
            name="page"
            id=""
            value={page <= 1 ? 1 : page >= nbPages ? nbPages : page}
          />
          <input
            className="boredr-solid cursor-pointer border border-[#ed1d24] bg-[#ed1d24] px-3 py-2 text-white"
            type="submit"
            value="GO"
          />
        </form>
        <span className="text-bold text-white">of</span>
        <span className="text-white">{nbPages}</span>

        {page >= nbPages ? (
          <span className="disabled font-bold">next</span>
        ) : (
          <span
            className="next cursor-pointer font-bold text-white"
            onClick={(event) => {
              handlePagination(page + 1, event);
            }}
          >
            next
          </span>
        )}
      </div>
    </div>
  );
};
export default PaginationAltern;
