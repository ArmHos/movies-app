import axios from "axios";
import "./CastCard.scss";
import { Link } from "react-router-dom";

const CastCard = ({ name, character, imgPath, id }) => {
  return (
    <Link to={`/person/${id}`}>
      <div
        className="cast-card"
        onClick={async () => {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/person/${id}?api_key=7f13c265977c4a3391a98cdf2ef7d809`
          );

          const res = await axios.get(
            `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=7f13c265977c4a3391a98cdf2ef7d809`
          );
          let filteredData = res.data.cast.filter(
            (item) => item.vote_average > 7.7
          );
          // https://image.tmdb.org/t/p/w300_and_h450_bestv2/nraZoTzwJQPHspAVsKfgl3RXKKa.jpg img
          localStorage.setItem(
            "currentActor",
            JSON.stringify({
              ...data,
              movies: [...filteredData],
              imgPath: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.profile_path}`,
            })
          );
        }}
      >
        <div className="cast-card-img">
          <img
            src={`https://www.themoviedb.org/t/p/w138_and_h175_face${imgPath}`}
            alt="actor"
          />
        </div>
        <div className="cast-card-names">
          <h5>{name}</h5>
          <h6>{character}</h6>
        </div>
      </div>
    </Link>
  );
};

export default CastCard;
