import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollToTop = ({ setScrollToTopHidden }) => {
  return (
    <div
      onClick={() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setScrollToTopHidden(true);
      }}
      className="fixed bottom-14 right-3 flex h-12 w-12 cursor-pointer items-center justify-center border border-solid border-red-500 bg-red-500 bg-opacity-70 transition-all duration-500 ease-in-out hover:bg-transparent hover:text-red-500"
    >
      <FontAwesomeIcon
        className="text-2xl text-white hover:text-red-500"
        icon="fa-solid fa-chevron-up"
      />
    </div>
  );
};
export default ScrollToTop;
