import MovieRating from "../../movie-rating/MovieRating";
import { BsPlayFill } from "react-icons/bs";
import { PiDotOutlineFill } from "react-icons/pi";

const MovieOverview = ({ setDisplay, movieDB, mediaType }) => {
  return (
    <div className="about-movie-overview">
      <h3>
        {mediaType === "movie"
          ? movieDB &&
            movieDB?.title &&
            `${movieDB.title} (${movieDB.release_date?.split("-")[0]})`
          : movieDB?.name && `${movieDB.name}`}
      </h3>
      <div className="about-movie-overview-realese">
        <span className="data">
          {
            /* {movieDB && movieDB.release_date.split("-").reverse().join("/")} */
            mediaType === "movie"
              ? movieDB && movieDB.release_date.split("-").reverse().join("/")
              : movieDB?.name &&
                `${movieDB.first_air_date
                  ?.split("-")
                  .reverse()
                  .join("/")} - ${movieDB.last_air_date
                  ?.split("-")
                  .reverse()
                  .join("/")}`
          }
        </span>
        <PiDotOutlineFill size={15} />
        <span className="genres">
          {movieDB &&
            movieDB.genres &&
            movieDB.genres.length !== 0 &&
            movieDB.genres.map((item, i) => {
              if (i !== movieDB.genres.length - 1) {
                return item.name + ",";
              }
              return item.name;
            })}
        </span>
        {mediaType === "movie" ? (
          <>
            <PiDotOutlineFill size={15} />
            <div className="runtime">
              {movieDB && movieDB.runtime && (
                <>
                  <span>{Math.floor(movieDB.runtime / 60)}h </span>
                  <span>{Math.floor(movieDB.runtime % 60)}m</span>
                </>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <MovieRating vote={movieDB && movieDB.vote_average} s={25} />
      <span className="about-movie-overview-tagline">
        {movieDB && movieDB.tagline}
      </span>
      {/* <p>{console.log(movieDB)}</p> */}
      <h2>Overview</h2>
      <p>{movieDB && movieDB.overview}</p>
      {movieDB && movieDB.videos && movieDB.videos.results.length !== 0 && (
        <div
          className="about-movie-trailer"
          onClick={() => {
            setDisplay(true);
          }}
        >
          <BsPlayFill size={32} color="#fff" />
          <span>Play Trailer</span>
        </div>
      )}
    </div>
  );
};

export default MovieOverview;
