const MovieTrailer = ({ setDisplay, movieDB }) => {
  return (
    <div
      className="trailer"
      onClick={() => {
        setDisplay(false);
      }}
    >
      <iframe
        width="700"
        height="420"
        src={`https://www.youtube.com/embed/${
          movieDB &&
          movieDB.videos &&
          movieDB.videos.results &&
          movieDB.videos.results
            .filter((item) => item.name.toLowerCase().includes("trailer"))
            .map((item) => `${item.key}`)[0]
        }`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieTrailer;
