import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const Comics = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics`);
        console.log("data =>", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>LOADING</p>
  ) : (
    <main className="comics-main">
      <div className="container">
        <section className="list comics-list">
          {data.results.map((result) => {
            return (
              <article key={result.title} className="item character-item">
                <img
                  src={`${result.thumbnail.path}/standard_fantastic.${result.thumbnail.extension}`}
                  alt=""
                />
                <h2>{result.title}</h2>
                <p>{result.description && result.description}</p>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
};
export default Comics;
