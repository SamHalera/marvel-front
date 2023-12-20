import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../api";
import Loader from "../components/Loader";
import ItemCarousel from "../components/ItemCarousel";
import ItemCarouselHome from "../components/ItemCarouselHome";
import ScrollToTop from "../components/ScrollToTop";

const Home = ({ truncateStr, userCookies, openModal, creatoUserCookies }) => {
  const [characters, setChararcters] = useState();
  const [comics, setComics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // console.log("index==>", Math.floor(Math.random() * comics?.results.length));

  const arrayComics = [];
  if (comics?.results.length > 0) {
    console.log("YES :");
    for (let i = 0; i < 3; i++) {
      const index = Math.floor(Math.random() * comics?.results.length);
      if (!comics.results[i].thumbnail.path.includes("image_not_available")) {
        // console.log("YES :", i);
        arrayComics.push(comics.results[index]);
        console.log(index);
      }
    }
  }
  console.log("array===>", arrayComics);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = 20;
        const response = await axios.get(`${baseUrl}?limit=${limit}`);
        setChararcters(response.data[0]);
        setComics(response.data[1]);
        console.log("Data===>", response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <main className="relative flex flex-col items-center justify-center">
      <div className="hero mb-10 h-screen w-full bg-cover bg-scroll bg-no-repeat p-[1px] md:bg-fixed ">
        <div className="relative z-0 flex h-screen w-full flex-col items-center justify-center bg-neutral-950 bg-opacity-80 ">
          <div className="m-5">
            <h1 className=" mb-8 flex flex-col gap-3  text-4xl font-bold uppercase text-white md:text-5xl">
              Welcome to the
              <span className="red"> Marvelous World of Marvel</span>
            </h1>
            <h2 className=" text-4xl text-white">
              Discover all the heroes and their Comics Sagas
            </h2>
          </div>
          <a
            href="#first-section"
            className="scroll absolute bottom-12 flex h-12 w-8  cursor-pointer items-center justify-center rounded-[33px] border border-solid border-red-500"
          >
            <div className=" h-2 w-1  rounded-full bg-red-500"></div>
          </a>
        </div>
      </div>
      <div
        id="first-section"
        className="relative my-10  h-auto w-full lg:h-screen"
      >
        <div className="right-[400px] top-[60px] mb-8 flex flex-col items-center lg:absolute">
          <h2 className="mb-6 flex flex-col gap-3 text-3xl font-bold uppercase text-white lg:text-5xl">
            Dive into the <span className="red">Marvel Universe</span>
          </h2>
          <button
            onClick={() => {
              navigate("/comics");
            }}
            className="btn-logout lg:self-end"
          >
            DISCOVER
          </button>
        </div>
        <div className="left-[300px] top-[200px] mx-auto lg:absolute">
          <div className="relative flex flex-col items-center justify-center md:flex-row">
            <div className="lg:absolute  lg:left-[0px]  lg:top-[0px] lg:h-[450px] lg:w-[350px]">
              <div className="">
                <img
                  className="h-68 w-52 object-contain object-center lg:h-[450px] lg:w-[350px]"
                  src={`${arrayComics[0].thumbnail.path}.${arrayComics[0].thumbnail.extension}`}
                  alt=""
                />
              </div>
            </div>
            <div className="lg:absolute lg:left-[200px] lg:top-[75px] lg:h-[450px] lg:w-[350px]">
              <div>
                <img
                  className="h-68 w-52 object-contain object-center lg:h-[450px] lg:w-[350px]"
                  src={`${arrayComics[1].thumbnail.path}.${arrayComics[0].thumbnail.extension}`}
                  alt=""
                />
              </div>
            </div>
            <div className="lg:absolute lg:left-[400px] lg:top-[150px] lg:h-[450px] lg:w-[350px]">
              <img
                className="h-68 w-52 object-contain object-center lg:h-[450px] lg:w-[350px]"
                src={`${arrayComics[2].thumbnail.path}.${arrayComics[0].thumbnail.extension}`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section-heroe h-auto w-full lg:h-screen">
        <div className="flex h-screen w-full flex-col items-center justify-center bg-neutral-950 bg-opacity-80 lg:items-start">
          <div className=" lg:w-4/4  w-4/5 lg:ml-44">
            <div className="mb-8">
              <h2 className="mb-12 flex flex-col gap-3 text-3xl font-bold uppercase text-white lg:text-4xl">
                Find your <span className="red">Favorite Heroe</span>
              </h2>

              <button
                onClick={() => {
                  navigate("/characters");
                }}
                className="btn-logout"
              >
                DISCOVER
              </button>
            </div>
            <div className="carousel hide-scroll-bar md:4/6 lg:w-6/6 w-5/5 flex h-80 overflow-scroll">
              {characters.results.map((oneCharacter) => {
                return (
                  <ItemCarouselHome
                    key={oneCharacter._id}
                    item={oneCharacter}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
