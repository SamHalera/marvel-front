//NOT USED yET
const Limiter = ({ limit, setLimit }) => {
  const selectItems = [];
  for (let i = 0; i < 100; i++) {
    selectItems.push(i + 1);
  }
  return (
    <div>
      <span>Limit your results par page</span>
      <input
        onChange={(event) => {
          // if(event.target.value < 1 || event.target.value > 100){

          // }
          setLimit(event.target.value);
        }}
        type="number"
        value={limit || ""}
      />
    </div>
  );
};
export default Limiter;
