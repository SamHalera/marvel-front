import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Favorites = ({ baseUrl }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("INSIDE FETCHDATA");

      try {
        const response = await axios.get(`${baseUrl}/favorites`);

        console.log("data =>", response.data);
        setData(response.data);

        setIsLoading(false);
        //when data are created we scroll smoothly to the div of list
        // document.body.scrollTop = 400; // For Safari
        // document.documentElement.scrollTop = 400; // For Chrome, Firefox, IE and Opera
      } catch (error) {
        console.log(error.response, "message error");
      }
    };

    fetchData();
  }, []);
  return isLoading ? (
    <div className="loader">LOADING</div>
  ) : (
    <main className="favorites-main">
      <h2>My Favorites</h2>
      <div className="container">
        <section className="list favorites-list">
          {data.map((favorite) => {
            return (
              <article key={favorite._id} className="item">
                <h3>{favorite.title || favorite.name}</h3>
                <div className="image-wrapper">
                  <img
                    src={`${favorite.thumbnail.path}.${favorite.thumbnail.extension}`}
                    alt=""
                  />
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
};
export default Favorites;
