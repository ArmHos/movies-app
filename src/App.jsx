import { useEffect, useState } from "react";
import "./App.scss";
import MovieCard from "./components/movie-card/MovieCard";
import { Route, Routes, Link } from "react-router-dom";
import AboutMovie from "./pages/about-movie/AboutMovie";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const resp = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=7f13c265977c4a3391a98cdf2ef7d809`
        );
        const data = await resp.json();
        setData(data.results);
        localStorage.setItem("trading", JSON.stringify(data.results));
      } catch (err) {
        throw new Error(err);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Header setData={setData} />
      <Routes>
        <Route
          path="/"
          element={<Home setData={setData} data={data} MovieCard={MovieCard} />}
        />
        <Route path="/about-movie/:id" element={<AboutMovie />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;