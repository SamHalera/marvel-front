import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Character = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { id } = location.state;
  console.log("data=>", data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--v5zlz7yt85wg.code.run/character/${id}`
        );

        console.log("rersponse.data =>", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div className="loader">LOADING</div>
  ) : (
    <main className="one-character-main">
      <div className="container">
        <section className="character-wrapper">
          <article key={data.name} className="character">
            <div className="info-character">
              <img
                src={`${data.thumbnail.path}/standard_xlarge.${data.thumbnail.extension}`}
                alt=""
              />
              <h2>{data.name}</h2>
            </div>
            <div className="list-of-comics">
              {data.comicsArray.map((comic) => {
                return (
                  <article key={comic._id}>
                    <img
                      src={`${comic.thumbnail.path}/standard_medium.${data.thumbnail.extension}`}
                      alt=""
                    />
                    <h3>{comic.title}</h3>
                  </article>
                );
              })}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};
export default Character;
