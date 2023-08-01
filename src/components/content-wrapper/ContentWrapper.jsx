import { useEffect, useRef, useState } from "react";
import CONFIG from "../../config";
import "./ContentWrapper.scss";

const dataImg = CONFIG.bcgImages;
let count = 0;

const ContentWrapper = ({ API_KEY, inputRef, setData }) => {
  const [img, setImg] = useState(dataImg[count]);
  useEffect(() => {
    const id = setInterval(() => {
      if (count === dataImg.length - 1) {
        count = 0;
      } else {
        count++;
      }
      setImg(dataImg[count]);
    }, 10000);
    return () => {
      clearInterval(id);
    };
  });

  return (
    <div className="movie-search" style={{ backgroundImage: `url(${img})` }}>
      <h1>Welcome.</h1>
      <h2>Millions of movies, TV shows and people to discover. Explore now.</h2>
      <div className="movie-search-section">
        <input
          type="text"
          ref={inputRef}
          placeholder="Search for a movie, tv show..."
        />
        <button
          onClick={async () => {
            let value = inputRef.current.value.trim();
            if (value) {
              try {
                const resp = await fetch(
                  `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${value}`
                );
                let movieData = await resp.json();
                console.log(movieData.results);
                let res = movieData.results.filter(
                  (item) => item.poster_path !== null
                );
                setData(res);
              } catch (err) {
                throw new Error(err);
              }
            }
            inputRef.current.value = "";
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ContentWrapper;
