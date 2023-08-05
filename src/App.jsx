import { useEffect, useState } from "react";
import "./App.scss";
import MovieCard from "./components/home/movie-card/MovieCard";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AboutPerson from "./components/about-person/AboutPerson";
import AboutPersonPage from "./pages/AboutPersonPage";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  const [data, setData] = useState([]);
  const tradingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=7f13c265977c4a3391a98cdf2ef7d809`;
  useEffect(() => {
    (async function () {
      try {
        const resp = await fetch(tradingUrl);
        const data = await resp.json();
        console.log(data);
        setData(data.results);
        localStorage.setItem("trading", JSON.stringify(data.results));
        localStorage.setItem("currentDataUrl", tradingUrl);
      } catch (err) {
        throw new Error(err);
      }
    })();
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <Header setData={setData} tradingUrl={tradingUrl} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              setData={setData}
              data={data}
              MovieCard={MovieCard}
              tradingUrl={tradingUrl}
            />
          }
        />
        <Route path="/:media_type/:id" element={<AboutPage />} />
        <Route path="/person/:id" element={<AboutPersonPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
