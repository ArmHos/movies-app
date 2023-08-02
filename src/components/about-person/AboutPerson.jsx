import { useEffect } from "react";
import "./AboutPerson.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";

const AboutPerson = () => {
  const gender = useRef([`Female`, `Male`]);
  const { id } = useParams();
  const [data, setData] = useState();
  const year = new Date().getFullYear();

  useEffect(() => {
    async function getActorData() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=7f13c265977c4a3391a98cdf2ef7d809`
      );

      const res = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=7f13c265977c4a3391a98cdf2ef7d809`
      );
      let filteredData = res.data.cast.filter(
        (item) => item.vote_average > 7.7
      );
      setData({
        ...data,
        movies: [...filteredData],
        imgPath: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.profile_path}`,
      });
      console.log(data);
    }
    getActorData();
  }, []);
  return (
    <div className="about-person">
      <div className="about-person-info">
        <div className="about-person-img">
          <img src={data && data.imgPath} alt="actor" />
        </div>
        <div className="about-person-info-bio">
          <h3>Personal Info</h3>
          <section>
            <h5>Known For</h5>
            <span>{data && data.known_for_department}</span>
          </section>
          <section>
            <h5>Gender</h5>
            <span>{data && gender.current[data.gender - 1]}</span>
          </section>
          <section>
            <span>
              <h5>Birthday</h5>
              {data &&
                `${data.birthday} (${
                  year - data.birthday.split("-")[0]
                } years old)`}
            </span>
          </section>
          <section>
            <h5>Place of Birth</h5>
            <span>{data && data.place_of_birth}</span>
          </section>
        </div>
      </div>
      <div className="about-person-biography">
        <h3>{data && data.name}</h3>
        <h5>Biography</h5>
        <div>
          {data &&
            data.biography.split("\n\n").map((item, i) => {
              return <p key={i}>{item}</p>;
            })}
        </div>
        {data && console.log(data.biography.split("\n\n"))}
      </div>
    </div>
  );
};

export default AboutPerson;
