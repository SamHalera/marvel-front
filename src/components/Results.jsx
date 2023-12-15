const Results = ({ data }) => {
  return (
    <h2 className="results-title m-2 text-3xl font-bold text-white">
      Results: {data.count}
    </h2>
  );
};
export default Results;
