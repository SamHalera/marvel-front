import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../api";
import Loader from "../components/Loader";
import ItemCarousel from "../components/ItemCarousel";

const Home = ({ truncateStr }) => {
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
      <div className="hero bg-settings h-screen w-full">
        <div className="relative z-0 flex h-screen w-full flex-col items-center justify-center bg-neutral-950 bg-opacity-80">
          <div>
            <h1 className=" mb-8 flex flex-col gap-3 text-3xl font-bold uppercase text-white lg:text-5xl">
              Welcome to the
              <span className="red"> Marvelous World of Marvel</span>
            </h1>
            <h2 className="text-2xl text-white lg:text-4xl">
              Discover all the heroes and their Comics Sagas
            </h2>
          </div>
          <div className="scroll absolute h-16 w-[2px] bg-red-500"></div>
        </div>
      </div>
      <div className="relative h-screen w-full">
        <div className="absolute right-[300px] top-[100px]">
          <h2 className="flex flex-col gap-3 text-2xl font-bold uppercase text-white lg:text-5xl">
            Dive into the <span className="red">Marvel Universe</span>
          </h2>
        </div>
        <div className="absolute left-[300px] top-[130px] mx-auto">
          <div className="relative">
            <div className="absolute  left-[0px] top-[0px] h-96 w-72 bg-indigo-400">
              <div className="">
                <img
                  src={`${arrayComics[0].thumbnail.path}.${arrayComics[0].thumbnail.extension}`}
                  alt=""
                />
              </div>
            </div>
            <div className="absolute left-[200px] top-[75px] h-96 w-72 bg-red-400">
              <div>
                <img
                  src={`${arrayComics[1].thumbnail.path}.${arrayComics[0].thumbnail.extension}`}
                  alt=""
                />
              </div>
            </div>
            <div className="absolute left-[400px] top-[150px] h-96 w-72 bg-gray-400">
              <img
                src={`${arrayComics[2].thumbnail.path}.${arrayComics[0].thumbnail.extension}`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section-heroe h-screen w-full">
        <div className="relative z-0 flex h-screen w-full flex-col items-center justify-center bg-neutral-950 bg-opacity-50">
          <div className="ml-96 w-2/4">
            <div className="mb-8">
              <h2 className="mb-12 flex flex-col gap-3 text-2xl font-bold uppercase text-white lg:text-4xl">
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
            <div className="w-6/6  flex h-72 overflow-scroll">
              {characters.results.map((oneCharacter) => {
                return (
                  <ItemCarousel key={oneCharacter._id} item={oneCharacter} />
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
