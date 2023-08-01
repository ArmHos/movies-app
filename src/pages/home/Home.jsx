import { useRef } from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "../../components/content-wrapper/ContentWrapper";
// import Footer from "../../components/footer/Footer";
// import Header from "../../components/header/Header";

function Home({ setData, data, MovieCard }) {
  const API_KEY = `7f13c265977c4a3391a98cdf2ef7d809`;
  const inputRef = useRef(null);
  return (
    <div className="movie-page">
      {/* <Header key={1} /> */}
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
    </div>
  );
}

export default Home;
