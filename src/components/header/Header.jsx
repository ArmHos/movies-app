// import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import { MdMovieFilter } from "react-icons/md";
import { useRef } from "react";
import axios from "axios";

const Header = ({ setData, tradingUrl }) => {
  const headerRef = useRef(null);

  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      headerRef.current.style.opacity = 1;
    } else if (currentScrollPos > 75) {
      headerRef.current.style.opacity = 0;
    }
    prevScrollpos = currentScrollPos;
  };
  return (
    <header ref={headerRef}>
      <a href="/">
        <div
          className="logo"
          onClick={() => {
            // let trading = JSON.parse(localStorage.getItem("trading"));
            // if (trading) {
            //   setData(trading);
            // }
            localStorage.setItem("currentDataUrl", tradingUrl);
          }}
        >
          <MdMovieFilter size={35} />
          <span>MovieDB</span>
        </div>
      </a>
      {/* <nav>
        <span
          onClick={async () => {
            try {
              const { data } = await axios.get(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=7f13c265977c4a3391a98cdf2ef7d809`,
                {
                  params: {
                    page: 1,
                  },
                }
              );
              localStorage.setItem(
                "currentDataUrl",
                `https://api.themoviedb.org/3/movie/top_rated?api_key=7f13c265977c4a3391a98cdf2ef7d809`
              );

              data.results = data.results.map((item) => {
                return {
                  ...item,
                  media_type: "movie",
                };
              });
              setData(data.results);
              console.log(data);
            } catch (err) {
              throw new Error(err);
            }
          }}
        >
          Top Rated Movies
        </span>
        <span
          onClick={async () => {
            try {
              const { data } = await axios.get(
                `https://api.themoviedb.org/3/tv/top_rated?api_key=7f13c265977c4a3391a98cdf2ef7d809`,
                {
                  params: {
                    page: 1,
                  },
                }
              );
              localStorage.setItem(
                "currentDataUrl",
                `https://api.themoviedb.org/3/tv/top_rated?api_key=7f13c265977c4a3391a98cdf2ef7d809`
              );
              data.results = data.results.map((item) => {
                return {
                  ...item,
                  media_type: "tv",
                };
              });
              console.log(data);
              setData(data.results);
            } catch (err) {
              throw new Error(err);
            }
          }}
        >
          Top Rated TV Shows
        </span>
      </nav> */}
    </header>
  );
};

export default Header;
