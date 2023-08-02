import { useEffect, useState } from "react";
import "./AboutMovie.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieTrailer from "./movie-trailer/MovieTrailer";
import MovieOverview from "./movie-overview/MovieOverview";
import CastCard from "./cast-card/CastCard";

function AboutMovie() {
  const { id, media_type } = useParams();
  const [movieDB, setMovieDB] = useState();
  const [display, setDisplay] = useState(false);
  const [cast, setCast] = useState();

  useEffect(() => {
    async function getData(id) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${
          media_type === "movie" ? "movie" : "tv"
        }/${id}?&append_to_response=videos&api_key=7f13c265977c4a3391a98cdf2ef7d809`
      );
      setMovieDB(data);
      console.log(data);
    }

    async function getCast(id) {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${
            media_type === "movie" ? "movie" : "tv"
          }/${id}/credits?api_key=7f13c265977c4a3391a98cdf2ef7d809`
        );
        setCast(data);
      } catch (err) {
        throw new Error(err);
      }
    }
    getCast(id);
    getData(id);
  }, []);
  // https://image.tmdb.org/t/p/w138_and_h175_face${link}
  return (
    <>
      <div className="about-movie">
        {/* Trailer Component */}
        {display && <MovieTrailer setDisplay={setDisplay} movieDB={movieDB} />}
        <div
          className="bcgImg"
          style={{
            backgroundImage:
              movieDB &&
              movieDB.backdrop_path &&
              `url(${`https://image.tmdb.org/t/p/original${movieDB.backdrop_path}`})`,
            backgroundSize: "cover",
            backgroundColor: "rgba(32, 11, 11, 0.6)",
            backgroundBlendMode: "overlay",
          }}
        >
          <div
            className="about-movie-card"
            style={{
              backgroundImage:
                movieDB &&
                movieDB.poster_path &&
                `url("https://image.tmdb.org/t/p/w500${movieDB.poster_path}")`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              // borderRadius: "12px",
            }}
          ></div>
          <MovieOverview
            setDisplay={setDisplay}
            movieDB={movieDB}
            mediaType={media_type}
          />
        </div>
      </div>
      <div className="about-cast">
        {console.log(cast && cast)}
        {cast &&
          cast.cast[0]?.profile_path &&
          cast.cast[0].name &&
          cast.cast[0].character && <h2>The Billed Cast</h2>}
        <div className="cast">
          {cast &&
            cast.cast
              .filter((item, i) => {
                return cast.cast.indexOf(item) === i;
              })
              .map((item) => {
                return (
                  item?.profile_path &&
                  item.name &&
                  item.character && (
                    <CastCard
                      name={item.name && item.name}
                      character={item.character && item.character}
                      imgPath={item?.profile_path && item?.profile_path}
                      key={item.id}
                      id={item.id}
                    />
                  )
                );
              })}
        </div>
      </div>
    </>
  );
}

export default AboutMovie;
