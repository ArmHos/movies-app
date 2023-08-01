import "./MovieCard.scss";
import MovieRating from "../movie-rating/MovieRating";
function MovieCard({ imgUrl, title, name, bcgImg, id, overview, vote }) {
  return (
    <div
      className="movie-card"
      style={{
        backgroundImage: bcgImg
          ? `url("https://image.tmdb.org/t/p/w500${bcgImg}")`
          : "none",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#123457ce",
        backgroundBlendMode: "overlay",
        cursor: "pointer",
      }}
    >
      <div className="movie-card-img">
        <img src={`https://image.tmdb.org/t/p/w500${imgUrl}`} alt="" />
      </div>
      <div className="movie-card-desc">
        <span style={{ color: "#fff" }}>
          {name ? cutTitle(name) : cutTitle(title)}
        </span>
        <MovieRating vote={vote} s={15} />
      </div>
    </div>
  );
}

// function cutTitle(title) {
//   let arrOfLetters = title.split("");
//   let res = "";
//   if (arrOfLetters.length < 15) {
//     res = arrOfLetters.join("");
//   } else {
//     for (let i = 0; i < 15; i++) {
//       res += arrOfLetters[i];
//     }
//     res += "...";
//   }
//   return res;
// }

function cutTitle(text) {
  if (!text) return "";

  let res = "";
  if (text.length < 15) {
    res = text;
  } else {
    res = text.slice(0, 15) + "...";
  }
  return res;
}
export default MovieCard;
