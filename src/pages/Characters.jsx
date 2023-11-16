import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Charachters = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("INSIDE FETCHDATA");

      try {
        const response = await axios.get(`http://localhost:3000`);
        console.log("data =>", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response, "message error");
      }
    };

    fetchData();
  }, []);

  return (
    <main className="characters-main">
      <section className="bg-img bg-settings">
        <div className="overlay">
          <h1>Enter the Marvel Univers</h1>
        </div>
      </section>

      {isLoading ? (
        <p>LOADING</p>
      ) : (
        <div className="container">
          <section className="list characters-list">
            {data.results.map((result, index) => {
              return (
                <Link
                  to={`/character/${result._id}`}
                  state={{ id: result._id }}
                  key={result.name}
                  className="item character-item"
                >
                  <div className="image-wrapper">
                    <img
                      src={`${result.thumbnail.path}/portrait_uncanny.${result.thumbnail.extension}`}
                      alt=""
                    />
                  </div>
                  <h2>{result.name}</h2>
                  <p>{result.description && result.description}</p>
                </Link>
              );
            })}
          </section>
        </div>
      )}
    </main>
  );
};
export default Charachters;
