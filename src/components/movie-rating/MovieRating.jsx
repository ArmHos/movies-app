import { AiFillStar } from "react-icons/ai";

const MovieRating = ({ vote, s }) => {
  return <div className="rating">{rating(vote, s)}</div>;
};

function rating(rate, s) {
  let svgArr = [];
  for (let i = 1; i <= 10; i++) {
    if (i <= Math.floor(rate)) {
      svgArr.push(<AiFillStar size={s} color="orange" key={i} />);
    } else {
      svgArr.push(<AiFillStar size={s} color="#fff" key={i} />);
    }
  }
  return svgArr;
}

export default MovieRating;
