import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ContentWrapper from "./content-wrapper/ContentWrapper";
import axios from "axios";

function Home({ setData, data, MovieCard }) {
  const API_KEY = `7f13c265977c4a3391a98cdf2ef7d809`;
  const inputRef = useRef(null);
  const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [page, setPage] = useState(1);
  return (
    <div className="movie-page">
      <ContentWrapper
        API_KEY={API_KEY}
        inputRef={inputRef}
        setData={setData}
        key={2}
      />
      <div className="movie-cards">
        {data.length !== 0 ? (
          data
            .filter((item) => item.media_type !== "person")
            .map((item) => {
              return (
                <Link to={`/${item.media_type}/${item.id}`} key={item.id}>
                  <MovieCard
                    imgUrl={item.poster_path}
                    title={item.title}
                    bcgImg={item.backdrop_path}
                    id={item.id}
                    overview={item.overview}
                    vote={item.vote_average}
                    name={item.name}
                    original_name={item.original_name}
                  />
                </Link>
              );
            })
        ) : (
          <span>Oops try again!</span>
        )}
      </div>
      <div className="pages">
        <button
          onClick={() => {
            setPages((prev) => {
              if (prev[0] !== 1) {
                prev.pop();
                prev.unshift(prev[0] - 1);
              }
              return [...prev];
            });
            setPage((p) => {
              if (p !== 1) {
                p -= 1;
              }
              pagesHandler(p, setData);
              return p;
            });
          }}
        >
          Prev
        </button>
        {pages.map((page, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                pagesHandler(page, setData);
                setPage(page);
              }}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => {
            setPages((prev) => {
              prev.shift();
              prev.push(prev[prev.length - 1] + 1);
              return [...prev];
            });
            setPage((p) => {
              p += 1;
              pagesHandler(p, setData);
              return p;
            });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

async function pagesHandler(page, setData) {
  const url = localStorage.getItem("currentDataUrl");
  try {
    const { data } = await axios.get(url, {
      params: {
        page,
      },
    });
    let media_type = "";
    if (url.includes("tv")) {
      media_type = "tv";
    } else {
      media_type = "movie";
    }
    data.results = data.results.map((item) => {
      return {
        ...item,
        media_type: media_type,
      };
    });
    console.log(data.results);
    setData(data.results);
    window.scrollTo(0, 300);
  } catch (err) {
    throw new Error(err);
  }
}
export default Home;
